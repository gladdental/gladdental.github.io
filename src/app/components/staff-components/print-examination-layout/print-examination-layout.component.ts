import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';
import { StaffService } from './../../../services/staff.service';
import { Subscription,Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-examination-layout',
  templateUrl: './print-examination-layout.component.html',
  styleUrls: ['./print-examination-layout.component.css']
})
export class PrintExaminationLayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public Examination = {
    'id' : 0,
    'patient' : null,
    'note' : 'loading'
  };
  public patient = {
    'name' : 'loading',
    'phone' : 'loading'
  };
  public doctor = {
    'name' : 'loading'
  };
  public staff = {
    'name' : 'loading'
  };
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
    }else{
      this.test();
      this.printerService.printCurrentWindow();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  test() {
    const ob = Observable.create((observer) => {
      observer.next(this.printExamination() );
      setTimeout(() => {
        observer.next('Ket qua 2');
      }, 5000); // Return "Ket qua 2" after 5s
    });

    const sub = ob.subscribe((result) => {
      console.log(result);
    });

    setTimeout(() => {
      sub.unsubscribe();
      console.log('Cancel request');
    }, 4000); // Cancel request after 2s
  }

  printExamination(){ 
    this.subscription = this.staffService.getExaminationById(Number(localStorage.getItem("id_exam"))).subscribe( res => {
      this.Examination = res;
      this.patient = res['patient'];
      this.doctor = res['docter'];
      this.staff = res['staff'];
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
