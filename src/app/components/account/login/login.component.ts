import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../../models/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';
  public submitted = false;
  public user: Login;
  public loginForm: FormGroup;

  constructor(
    public loginService: LoginService,
    public routerService: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username : ['', [
        Validators.required,
      ]],
      password : ['', [
        Validators.required,
      ]]
    });
  }

  submit(loginForm) {
    this.submitted = true;
    if (loginForm.invalid) {
      return;
    } else {
      this.user = { username : loginForm.value.username, password: loginForm.value.password };
      this.loginService.login(this.user).pipe(first()).subscribe(
        data => {
          localStorage.setItem('username', loginForm.value.username);
          let user: string = loginForm.value.username;
          user = user.substr(0, 5);
          if (user === 'teach' || user === 'admin') {
            this.routerService.navigateByUrl('admin');
          } else {
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Login successfully!',
              showConfirmButton: false,
              timer: 1000
            });
            this.routerService.navigateByUrl('');
          }
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'Wrong credentials!',
            text: 'Please try again'
          });
        }
      );
    }
  }

}

