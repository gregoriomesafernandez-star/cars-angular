import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  public title: string = "";
  public user: User;
  public status: string = '';
  public token: string | null = null;
  public identity: string | null = null;

  // Inyección moderna sin necesidad de constructor
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _userService = inject(UserService); 
  private _cdr = inject(ChangeDetectorRef);
  
  constructor() {
    this.title = 'Identificáte';
    this.user = new User(0, '', '', '', '', '');
  }

  ngOnInit(): void{
    console.log('Componente Login Iniciado');
    this.logout();
  }

  onSubmit(form:any){
    this._userService.signup(this.user).subscribe({
      next: response => {
            
        if(response.status != 'error'){

          //Obtenemos Token
          this.token = response;

          if(this.token != null){
            localStorage.setItem('token', this.token);
          }

          //Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe({
            next: response => {

              //Obtenemos Usuario Objeto
              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              form.reset();
              this._router.navigate(['/home']);
            },
            error: error => {
              console.log(error);
            }
          });
                
        }else{
          this.status = 'error';
          this._cdr.detectChanges();
        } 
      },

      error: error => {
        console.log(error);
        this.status = 'error';
        this._cdr.detectChanges();
      }
    });
  }

  logout(){

    this._route.params.subscribe(params => {
      let logout = +params['sure'];
      
      if(logout == 1){
        
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token  = null;

        this._router.navigate(['/home']);
      }
    });
  }
}


