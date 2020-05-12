import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public apiUrl: string = environment.urlApi;

  constructor(
    private httpLogin: HttpClient
  ) { }

  login(userInfo: Login) {
    const loginUrl = `${this.apiUrl}/api/user/login`;
    return this.httpLogin.post<any>(loginUrl, userInfo).pipe(map( user => {
      // tslint:disable-next-line: no-string-literal
      if (user && user['access']) {
        // tslint:disable-next-line: no-string-literal
        localStorage.setItem('access_token', user['access']);
      }
      return user;
    }));
  }
}
