import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { UserService } from './../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  subscription: Subscription;
  public User : object = {
    'image' : null
  };

  constructor(
    public userService : UserService,
  ) { }

  ngOnInit() {
    this.loadProfile();
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

  loadProfile(){
    this.subscription = this.userService.getUserProfile().subscribe( data => {
      this.User = data['results'][0]; 
    }, error => {
      if(error.status == 401){
        this.userService.refreshToken(localStorage.getItem("refresh")).subscribe(res =>{
          localStorage.setItem("bearToken",res["access"]);
          window.location.reload();
        },error =>{
          console.log(error);
          localStorage.removeItem("bearToken");
          localStorage.removeItem("refresh");
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
}
