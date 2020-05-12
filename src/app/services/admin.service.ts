import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + environment.token
  })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getRevenueByYear(year):Observable<any> {
    return this.http.get<any>(`${this.API}/api/statistic/revenuebyyear/?year=${year}`, httpOptions);
  }

  getRevenueByMonth(month):Observable<any> {
    return this.http.get<any>(`${this.API}/api/statistic/revenuebymonth/?month=${month}`, httpOptions);
  }

  getTotalStatistic():Observable<any> {
    return this.http.get<any>(`${this.API}/api/statistic/total/`, httpOptions);
  }

  getScheduleByTime(page):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/?page=${page}&ordering=-date,-time`, httpOptions);
  }

  getScheduleToday(page):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/?page=${page}&today=1`, httpOptions);
  }

  getFreeTimeList(date):Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/schedule/freetime/?date=${date}`, httpOptions);
  }

  updateSchedule(id: number, name, email, phone, date, time, note):Observable<any>{
    const json = JSON.stringify({
      name : name,
      email : email,
      phone : phone,
      date : date,
      time : time,
      note : note
    });
    return this.http.patch<any>(`${this.API}/api/schedule/${id}/`,json, httpOptions);
  }

  getScheduler():Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/scheduler/?ordering=date,time`, httpOptions);
  }

  deleteSchedule(id: number):Observable<any>{
    return this.http.delete<any>(`${this.API}/api/schedule/${id}/`, httpOptions);
  }
}