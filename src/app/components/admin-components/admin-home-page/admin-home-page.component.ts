import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.checkToken();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkToken() {
    this.subscription = this.userService.checkToken().subscribe(res => {
    }, error => {
      if (error.status == 401) {
        this.userService.refreshToken(localStorage.getItem("refresh")).subscribe(res => {
          localStorage.setItem("bearToken", res["access"]);
          window.location.reload();
        },error =>{
          localStorage.removeItem("bearToken");
          localStorage.removeItem("refresh");
          Swal.fire({
            title: 'Error!',
            text: "Hết hạn đăng nhập",
            icon: 'error',
            confirmButtonText: 'Cool'
          });
          window.location.reload();
        });
      }else {
        var message = JSON.stringify(error.error)
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    });
  }

  onLogout() {
    this.subscription = this.userService.logoutUser().subscribe(res => {
      localStorage.removeItem('bearToken');
      window.location.reload();
    },error => {
      var message = JSON.stringify(error.error)
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
        localStorage.removeItem('bearToken');
        window.location.reload();
    });
  }

}
