import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Schedule } from './../models/schedual.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public API = environment.urlApi;

  constructor(public http: HttpClient) { }

  getAllSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.API}/api/schedule/`, httpOptions);
  }

  filterSchedule(id_crse: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.API}/api/schedule/?course=${id_crse}`, httpOptions);
  }

}
