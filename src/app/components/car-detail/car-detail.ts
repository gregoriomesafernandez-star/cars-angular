import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../services/car/car-service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-detail',
  imports: [RouterLink],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.css',
})
export class CarDetail implements OnInit{

  public title: string = "";
  public status: string = '';
  public car!: Car;

  // Inyección moderna sin necesidad de constructor
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _carService = inject(CarService); 
  private _cdr = inject(ChangeDetectorRef);
 

  constructor() {
    this.title = 'Datos del vehículo';
  }

  ngOnInit(){
    this.getCar();
  }

  getCar(){

    this._route.params.subscribe(params => {

      let id = +params['id'];

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

    });

  }

}