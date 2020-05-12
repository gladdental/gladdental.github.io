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
export class ServiceService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getListService(page : number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/service/?page=${page}`,httpOptions);
  }

  getDetailService(id): Observable<any> {
    return this.http.get<any>(`${this.API}/api/service/${id}/`, httpOptions);
  }

  updateService(id: number, name: string, cost: number, guarantee: number){

    const json = JSON.stringify({
      name : name,
      guarantee : guarantee
    });
    return this.http.patch<any>(`${this.API}/api/service/${id}/`, json, httpOptions);
  }

  updateCostService(id: number,cost: number): Observable<any>{
    const json = JSON.stringify({
      cost : cost
    });
    return this.http.patch<any>(`${this.API}/api/service/${id}/`, json, httpOptions);
  }

  createService(name: string, cost: number, unit: string,guarantee: number, treatment: number){

    const json = JSON.stringify({
      name : name,
      cost : cost,
      unit : unit,
      // guarantee : guarantee,
      treatment : treatment
    });
    return this.http.post<any>(`${this.API}/api/service/`, json, httpOptions);
  }

  deleteService(id: number){
    return this.http.delete<any>(`${this.API}/api/service/${id}/`, httpOptions);
  }
}
