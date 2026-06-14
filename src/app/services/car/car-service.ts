import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../global';
import { Car } from '../../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  public url: string = '';
  public token: any = '';
  public identity: any = '';

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  create(token:string, car: Car): Observable<any> {

      let headers = new HttpHeaders().set('Authorization', token);
                                     
      return this._http.post(
        this.url + 'cars',
        car, 
        { headers: headers }
      );
  }

  getCars(): Observable<any> {
  
      return this._http.get(
        this.url + 'cars'
      );
  }

  getCar(id: number): Observable<any>{
    return this._http.get(
      this.url + 'cars/' + id
    );
  }

  update(token: string, car: Car, id: number): Observable<any>{

    let headers = new HttpHeaders()
        .set('Authorization', token);

    
    return this._http.put(
        this.url + 'cars/' + id,
        car,
        {headers: headers}
    );
  }

  delete(token: string, id: number): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    return this._http.delete(this.url + 'cars/' + id, {headers: headers});

  }
}