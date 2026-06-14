import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Car } from '../../models/car';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user/user.service';
import { CarService } from '../../services/car/car-service';

@Component({
  selector: 'app-car-new',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './car-new.html',
  styleUrl: './car-new.css',
})
export class CarNew implements OnInit{

  public page_title: string;
  public btn_send: string;
  public car!: Car;
  public token: string;
  public identity: string;
  public status_form_car: string='';

  // Inyección moderna sin necesidad de constructor
  private _router = inject(Router);
  private _userService = inject(UserService);
  private _carService = inject(CarService);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    this.page_title = 'Crear coche';
    this.btn_send = 'Crear';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }

  ngOnInit(): void{
    console.log('Componente New Car Iniciado');
    
    if(this.identity == null){
        this._router.navigate(["/login"]);
    }else{
        // Crear objeto coche
        this.car = new Car(0, '', '', 0, '', null, null);
    }
  }

  onSubmit(form:any){

    this._carService.create(this.token, this.car).subscribe({
      next: (response) => {

        if(response.status == 'success'){

          this.status_form_car = 'success';
          this._cdr.detectChanges();
          form.reset();
          this._router.navigate(['/home']);

        } else {

          this.status_form_car = 'error';
          
        }
        
      },
      error: (error) => {
        console.log(error);
        this.status_form_car = 'error';
        this._cdr.detectChanges();
      },
    });
  }
}