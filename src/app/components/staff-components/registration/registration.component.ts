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
      console.log(data);
    })
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

}
