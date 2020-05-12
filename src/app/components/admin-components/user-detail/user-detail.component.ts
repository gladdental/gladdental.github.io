import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  subscriptionParams: Subscription;
  subscription: Subscription;
  public UserDetail ={
    "id": 0,
    "username": null,
    "name": null,
    "phone": null,
    "email": null,
    "address": null,
    "image": null,
    "gender": true,
    "birthday": null,
    "is_docter": false,
    "is_manager": false,
    "qualification": null,
    "experience": 0,
    "specialisation": null,
    "create_at": null,
    "is_deleted": false
  };

  constructor(
    public activatedRouterService: ActivatedRoute,
    public routerService: Router,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription || this.subscriptionParams) {
      this.subscription.unsubscribe();
      this.subscriptionParams.unsubscribe();
    }
  }

  loadData() {
    this.subscriptionParams = this.activatedRouterService.params.subscribe(data => {
      this.subscription = this.userService.getDetailUser(data['id']).subscribe( data => {
        this.UserDetail = data;
        console.log(this.UserDetail);
      });
    });
  }

  updateUser(id, fullname, email, phone){
    this.userService.updateUser(id, fullname, email, phone).subscribe( data => {
      Swal.fire({
        title: 'Success',
        text: 'Cập nhật thành công',
        icon: 'success',
      });
      this.ngOnInit();
    },error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  public enableReset : boolean = false;
  onShowReset(){
    this.enableReset = true;
  }

  onResetPass(password){
    this.subscription = this.userService.resetPassUser(this.UserDetail.id, password).subscribe( res =>{
      Swal.fire({
        title: 'Success',
        text: 'Khôi phục mật khẩu thành công',
        icon: 'success',
      });

    },error =>{
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }
}