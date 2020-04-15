import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';
import { StaffService } from './../../../services/staff.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-examination-layout',
  templateUrl: './print-examination-layout.component.html',
  styleUrls: ['./print-examination-layout.component.css']
})
export class PrintExaminationLayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public Examination : any;
  public patient : any;
  public doctor : any;
  public staff : any;

  constructor(
    public staffService : StaffService,
    public printerService : NgxPrinterService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('id_exam') == null ){
      Swal.fire({
        title: 'Error!',
        text: "Không có dữ liệu",
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }else this.printExamination();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  printExamination(){ 
    this.subscription = this.staffService.getExaminationById(Number(localStorage.getItem("id_exam"))).subscribe( res => {
      this.Examination = res;
      this.patient = res['patient'];
      this.doctor = res['docter'];
      this.staff = res['staff'];
      this.printerService.printCurrentWindow();
    }, error =>{
      console.log(error);
      var message = JSON.stringify(error.error);
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }
}