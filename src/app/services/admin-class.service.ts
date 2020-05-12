import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
export class AdminClassService {

  public API = environment.urlApi;
  constructor(
    public http: HttpClient
  ) { }

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/class/`, httpOptions);
  }

  enterScore(id, score: string): Observable<any> {

    const _score = {
      'score' : score
    };
    const sc = JSON.stringify(_score);
    return this.http.put<any>(`${this.API}/api/class/${id}/`, sc, httpOptions);
  }
}
