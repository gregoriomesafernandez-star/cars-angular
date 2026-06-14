import { Routes } from '@angular/router';


import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { CarNew } from './components/car-new/car-new';
import { CarEdit } from './components/car-edit/car-edit';
import { CarDetail } from './components/car-detail/car-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'logout/:sure', component: Login },
  { path: 'register', component: Register },
  { path: 'crear-coche', component: CarNew },
  { path: 'editar-coche/:id', component: CarEdit },
  { path: 'coche/:id', component: CarDetail },

  //ruta no existe
  { path: '**', redirectTo: 'home' }
];