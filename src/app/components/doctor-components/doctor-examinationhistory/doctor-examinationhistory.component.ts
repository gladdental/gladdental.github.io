import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from './../../../services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-examinationhistory',
  templateUrl: './doctor-examinationhistory.component.html',
  styleUrls: ['./doctor-examinationhistory.component.css']
})
export class DoctorExaminationhistoryComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public _p: number = 1;
  public _total: number;
  public Examination: any[];

  constructor(
    public doctorService: DoctorService,
  ) { }

  ngOnInit() {
    this.loadData(this._p);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(page) {
    this.subscription = this.doctorService.getPublicExamination(page).subscribe(data => {
      this.Examination = data['results'];
      console.log(this.Examination);
      
      this._total = data['count'];
    }, error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  changePage(event){
    this._p = event;
    this.loadData(this._p);
  }

}


// Swal.fire({
//   title: 'Success',
//   text: 'Khôi phục mật khẩu thành công',
//   icon: 'success',
// });