import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../global';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url: string = '';
  public token: any = '';
  public identity: any = '';

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {

    return this._http.post(
      this.url + 'register',
      user
    );

  }

  signup(user: User, gettoken?: any): Observable<any> {

    let userToSend: any = { ...user };

    if (gettoken != null) {
      userToSend.gettoken = true;
    }

    return this._http.post(this.url + 'login', userToSend);
  }

  getIdentity() {
    let identity = localStorage.getItem('identity');

    if (identity && identity != 'undefined') {
      this.identity = JSON.parse(identity);
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}