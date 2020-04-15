import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { error } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public API = environment.urlApi;

  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('bearToken'));
    if (localStorage.getItem('bearToken') != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('bearToken'));
      if(decodedToken['type'] == 'admin'){
        console.log(typeof(decodedToken['type']));
        this.router.navigate(['admin']);
      }else if(decodedToken['type'] == 'doctor'){
        this.router.navigate(['doctor']);
      }
      else{
        this.router.navigate(['']);
      }
    }
  }

  login(username,password){
    this.http.post<any[]>(`${this.API}/api/user/login/`, { username: username, password: password }).subscribe(res => {
      console.log(res['access']);

      localStorage.setItem('bearToken', res['access']);
      localStorage.setItem('refresh', res['refresh']);

      window.location.reload();
    },error => { 
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });
  }

}
