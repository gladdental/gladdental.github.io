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
}