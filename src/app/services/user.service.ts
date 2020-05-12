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

const headersRefresh = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = environment.urlApi;
  public load = true;

  constructor(public http: HttpClient) { }

  getListUser(page :number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/admin/user/?page=${page}`,httpOptions);
  }

  getDetailUser(id): Observable<any> {
    return this.http.get<any>(`${this.API}/api/admin/user/${id}/`, httpOptions);
  }

  createUser(username: string, password:string, name: string, phone: string, is_doctor: boolean, is_staff: boolean){
    const json = JSON.stringify({
      username : username,
      password : password,
      name : name,
      phone : phone,
      is_docter : is_doctor,
      is_manager : is_staff
    });
    return this.http.post<any>(`${this.API}/api/admin/user/`, json, httpOptions);
  }

  updateUser(id: number, name: string, email: string, phone: string){
    const json = JSON.stringify({
      name : name,
      phone : phone,
      email : email
    });
    return this.http.patch<any>(`${this.API}/api/admin/user/${id}/`, json, httpOptions);
  }

  resetPassUser(id: number,password: string){
    const json = JSON.stringify({
      password : password
    });
    return this.http.patch<any>(`${this.API}/api/admin/user/${id}/`, json, httpOptions);
  }

  deleteUser(id: number){
    return this.http.delete<any>(`${this.API}/api/admin/user/${id}/`, httpOptions);
  }

  getListDoctor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/staff/user/`,httpOptions);
  }

  getUserProfile(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/api/user/profile/`,httpOptions);
  }

  refreshToken(refresh): Observable<any> {
    const json = JSON.stringify({
      refresh : refresh
    });
    return this.http.post<any>(`${this.API}/api/token/refresh/`, json, headersRefresh);
  }

  checkToken(): Observable<any> {
    return this.http.get<any>(`${this.API}/api/token/check/`, httpOptions);
  }

  logoutUser(): Observable<any> {
    const json = JSON.stringify({
      token : 'Bearer ' + environment.token
    });
    return this.http.post<any>(`${this.API}/api/user/logout/`,json ,httpOptions);
  }
}
