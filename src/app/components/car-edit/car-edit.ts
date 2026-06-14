import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { CarService } from '../../services/car/car-service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-edit',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: '../car-new/car-new.html',
  styleUrl: './car-edit.css',
})
export class CarEdit implements OnInit{

  public page_title: string = "";
  public btn_send: string = "";
  public status: string = '';
  public status_form_car: string = '';
  public car: Car;
  public token: string;

  // Inyección moderna sin necesidad de constructor
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _carService = inject(CarService); 
  private _cdr = inject(ChangeDetectorRef);
  private _userService = inject(UserService);

  constructor() {
    this.page_title = 'Editar vehículo';
    this.btn_send = 'Guardar'
    this.car = new Car(0, '', '', 0, '', null, null);
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getCar(id);
    });
   
  }

  onSubmit(form:any){

    this._carService.update(this.token, this.car, this.car.id).subscribe({
      next: (response) => {

         if(response.status == 'success'){

          this.status_form_car = 'success';
          this._cdr.detectChanges();
          this._router.navigate(['/coche', response.car.id]);

        } else {

          this.status_form_car = 'error';
          
        }

      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  getCar(id: number){

      this._carService.getCar(id).subscribe({

        next: (response) => {

          if(response.status == 'success'){

            this.car = response.car;
            this._cdr.detectChanges();
            
          } else {
            this._router.navigate(['home']);
          }
        },

        error: (error) => {

          console.log(error);

        }

      });
  }

  
}
