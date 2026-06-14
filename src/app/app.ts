import { Component, DoCheck, inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserService } from './services/user/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, DoCheck{

  public identity!: User;
  public token;

  // Inyección sin necesidad de constructor
  private _userService = inject(UserService);

  constructor(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log('Componente App cargado');
  }

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
