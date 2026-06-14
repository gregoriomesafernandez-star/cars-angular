import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user/user.service';
import { CarService } from '../../services/car/car-service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public title: string = '';
  public status: string = '';
  public cars: Car[] = [];
  public token: string;
  public identity: string;
  public loading: boolean = true;

  // Inyección moderna sin necesidad de constructor
  private _userService = inject(UserService);
  private _carService = inject(CarService);
  private _cdr = inject(ChangeDetectorRef);

  constructor() {
    this.title = 'Inicio';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    console.log('Componente Home iniciado');
    this.getCars();
  }

  getCars(){
    this._carService.getCars().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.cars = response.cars;
          this.loading = false;
          this._cdr.detectChanges();
        } else {
          this.status = 'error';
        }
      },
      error: (error) => {
        console.log('ERROR CARS:', error);
        this.status = 'error';
      },
    });
  }

  deleteCar(id: number) {
    this._carService.delete(this.token, id).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.getCars();
        }
      },

      error: (error) => {
        console.log(<any>error);
      },
    });
  }
}