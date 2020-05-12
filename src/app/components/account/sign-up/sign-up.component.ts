import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  student: Student;
  signupForm: FormGroup;
  submitted = false;
  subscription: Subscription;
  userToLogin: Login;

  constructor(
    public formBuilder: FormBuilder,
    public studentService: StudentService,
    public routerService: Router,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
      username : ['', [
        Validators.required,
      ]],
      password : ['', [
        Validators.required,
      ]],
      email : ['', [
        Validators.required,
        // tslint:disable-next-line: max-line-length
        Validators.pattern(`(?!^[.+&'_-]*@.*$)(^[_\\w\\d+&'-]+(\\.[_\\w\\d+&'-]*)*@[\\w\\d-]+(\\.[\\w\\d-]+)*\\.(([\\d]{1,3})|([\\w]{2,}))$)`)
      ]]
    });
  }

  submit(signupForm) {
    this.submitted = true;
    if (signupForm.invalid) {
      return;
    } else {
        this.student = { username : signupForm.value.username, password: signupForm.value.password, email: signupForm.value.email };
        this.subscription = this.studentService.createStudent(this.student).subscribe( data => {
          this.userToLogin = { username : signupForm.value.username, password: signupForm.value.password };
          this.loginService.login(this.userToLogin).pipe(first()).subscribe(data => {});
          Swal.fire({
            title: '<strong>Signed up successfully!</strong>',
            type: 'success',
            html: 'Welcome to Gladversity!',
            showCloseButton: true,
            focusConfirm: false,
          });
          localStorage.setItem('username', signupForm.value.username);
          this.routerService.navigateByUrl('');
      },
      error => {
        Swal.fire({
          title: '<strong>Duplicated username!</strong>',
          type: 'error',
          html: 'This username is existed. Please try again!',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        });
        console.log(error);
      });
    }
  }

}
