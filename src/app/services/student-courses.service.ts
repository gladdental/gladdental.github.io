import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Register } from '../models/register.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  public API = environment.urlApi;

  constructor(
    public http: HttpClient
  ) { }

  getAllRegistrations(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.API}/api/stup/`, httpOptions);
  }

  getPendingRegistrations(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.API}/api/stup/?isActive=false`, httpOptions);
  }

  getApprovedRegistrations(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.API}/api/stup/?isActive=true&status=liked`, httpOptions);
  }

  getSuccessfulRegistrations(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.API}/api/stup/?status=registered`, httpOptions);
  }

}
