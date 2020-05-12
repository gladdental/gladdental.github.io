import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllRegistrations(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.API}/api/manager/stup/`, httpOptions);
  }

  approveRegistration(id: number): Observable<Register> {
    const json = JSON.stringify({
      'isActive' : "True"
    });
    return this.http.patch<Register>(`${this.API}/api/manager/stup/${id}/`, json, httpOptions);
  }
}
