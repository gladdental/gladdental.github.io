import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public registration:  any[] = [];
  _p : number = 1;
  _total : number;

  constructor(
    public staffService : StaffService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.staffService.getListRegistration(this._p).subscribe( data => {
      this.registration = data['results'];
    });
  }

  onApproveRegister(id_res){
    this.subscription = this.staffService.approveScheduleRegistration(id_res).subscribe( data => {
      Swal.fire({
        title: 'Success',
        text: 'Duyệt thành công',
        icon: 'success',
      });
      this.loadData();
    },error =>{
      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error',
      });
    })
  }

  checkFile(filename){
    const typeMP4 = ['mp4','mov','MP4','MOV'];
    if(typeMP4.indexOf(filename.substring(filename.lastIndexOf(".") + 1)) > -1) return true; 
    return false;
  }

  onDelete(id){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa đăng ký này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.staffService.RejectScheduleRegistration(id).subscribe(res => {
          this.loadData();
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
