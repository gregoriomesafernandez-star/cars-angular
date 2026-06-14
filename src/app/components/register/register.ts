import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{

  public title: string = "";
  public user: User;
  public status: string='';

  // Inyección moderna sin necesidad de constructor
  private _userService = inject(UserService);

  constructor() {
    this.title = 'Registrate';
    this.user = new User(0, '', '', '', '', '');
  }

  ngOnInit(): void{
    console.log('Componente Register Iniciado');
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
        response => {

          if(response.status == 'success'){
            this.status = response.status;

            //Vaciar Form
            form.reset();

          }else{
            this.status = 'error';
            console.log(response);
          }
            
        },
        error => {
            console.log(error);
        }
    );
  }
}