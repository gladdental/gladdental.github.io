import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { UserService } from './../../../services/user.service';
// import { detailuser } from '../../../models/customer.class';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public user : any[];
  is_doctor : boolean = true;
  is_staff : boolean = false;

  _p: number = 1;
  _total: number;

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadUser(){
    this.subscription = this.userService.getListUser(this._p).subscribe( data => {
      this.user = data['results'];
      this._total = data['count'];
    });
  }

  changePage(event) {
    this._p = event
    this.userService.getListUser(this._p).subscribe(data => {
      this.user = data['results'];
    });
  }

  onChangePosition(value){
    var isTrueSet = (value == 'true');
    this.is_doctor = isTrueSet;
    this.is_staff = !isTrueSet;
  }

  onCreateUser(username, password, name, phone){
    console.log(username);
    console.log(name);
    console.log(this.is_doctor);
    console.log(this.is_staff);
    this.userService.createUser(username, password, name, phone, this.is_doctor, this.is_staff).subscribe( data => {
      this.ngOnInit();
    })
  }

  onDelete(id){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa tài khoản này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe(res => {
          this.loadUser();
          Swal.fire(
            'Đã xóa!',
            'Xóa thành công.',
            'success'
          )
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
    });
  }

}
