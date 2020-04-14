import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { SharingDataService } from './../../../services/sharing-data.service';
import { StaffService } from './../../../services/staff.service';
import { PrintService } from './../../../services/print.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-examination',
  templateUrl: './staff-examination.component.html',
  styleUrls: ['./staff-examination.component.css']
})
export class StaffExaminationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  _p: number = 1;
  _total: number;
  public Examination: any[] = [];
  constructor(
    public staffService: StaffService,
    public printService: PrintService,
    private sharingDataService: SharingDataService,
    public routerService: Router,
  ) { }

  ngOnInit() {
    this.loadExamination();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadExamination() {
    this.subscription = this.staffService.getListExamination(this._p).subscribe(data => {
      this.Examination = data['results'];
      this._total = data['count'];
      console.log(this.Examination);
      
    }, error => {
      console.log(error);
    })
  }

  public involve : any;
  public diagnosis: any[] = [];

  onPayment(id_exam) {
    this.subscription = this.staffService.createInvolve(id_exam).subscribe(data => {
      if (typeof (data) == "string") {
        var jsonObject: any = JSON.parse(data)
        this.involve = jsonObject;
      } else {
        this.involve = data;
      }
    }, error => {
      console.log(error);
    });
  }

  onPaid(payment, received, paid) {
    console.log(payment, received, paid, this.involve['id']);
    this.staffService.updateInvolve(this.involve['id'], payment, received, paid).subscribe(data => {
      Swal.fire({
        title: 'Success',
        text: 'Thanh toán thành công',
        icon: 'success',
      });
      this.loadExamination();
      //print invoice
      localStorage.setItem('id_exam', this.involve['examination']);
      localStorage.setItem('id_invoice',this.involve['id']);
      window.open(window.location.href + "/print", '_blank');
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

  onPrint() {
    localStorage.setItem('id_exam', '21');
    localStorage.setItem('id_invoice','17');
    
    window.open(window.location.href + "/print", '_blank');
    // this.routerService.navigateByUrl('examination/print');
  }

}

// Swal.fire({
//   title: 'Success',
//   text: 'Đã thêm thông tin một khách hàng',
//   icon: 'success',
// });
// },
// error => {
// Swal.fire({
//   title: 'Error!',
//   text: 'Không thành công',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })
