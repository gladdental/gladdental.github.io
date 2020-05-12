import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';
import { StaffService } from './../../../services/staff.service';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-print-involve-layout',
  templateUrl: './print-involve-layout.component.html',
  styleUrls: ['./print-involve-layout.component.css']
})
export class PrintInvolveLayoutComponent implements OnInit,OnDestroy {

  // constructor(
  //   private printerService: NgxPrinterService,
  //   private sharingDataService : SharingDataService,
  // ) { }
  subscription: Subscription;
  public invoice = {
    'voucher' : null,
    'cost' : null,
    'paid' : null,
    'owe' : null
  };
  public examination : any;
  public diagnosis : any[] = [];

  public patient = {
    'name' : null,
    'phone' : null,
    'qrcoce' : null
  };
  public doctor = {
    'name' : null
  };
  public exam = {
    'note' : null
  };
  public reexam = {
    'time' : null,
    'date' : null,
    'detail' : null
  };
  public staff = {
    'name' : null
  };

  constructor(
    public printerService : NgxPrinterService,
    public staffService : StaffService,
  ) {  } 

  ngOnInit() {
    if(localStorage.getItem('id_exam') == null ){
      Swal.fire({
        title: 'Error!',
        text: "Không có dữ liệu",
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }else{
      //this.printInvoice();
      this.test();
      
      // this._sleep(10000);
      this.printerService.printCurrentWindow();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  _sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  test() {
    const ob = Observable.create((observer) => {
      this.printInvoice();
      observer.next(this.printInvoice());
      setTimeout(() => {
        observer.next('Ket qua 2');
      }, 6000); // Return "Ket qua 2" after 5s
    });

    const sub = ob.subscribe((result) => {
      console.log(result);
    });

    setTimeout(() => {
      sub.unsubscribe();
      console.log('Cancel request');
    }, 5000); // Cancel request after 2s
  }

  printInvoice(){ 
    this.subscription = this.staffService.getInvoice(Number(localStorage.getItem('id_invoice'))).subscribe( data =>{
      this.invoice = data;
      this.patient = data['examination']['patient'];
      this.doctor = data['examination']['docter'];
      this.exam = data['examination'];
      // localStorage.removeItem('id_invoice');
    }, error =>{
      console.log(error);
    });
    this.getDiagnosis();
    this.getStaff();
    
  }

  async getDiagnosis(){
    const id = localStorage.getItem('id_exam');
    this.subscription = this.staffService.getDiagnosisByExam(Number(id)).subscribe(data => {
      this.diagnosis = data;
      this.getAppointment();
      // localStorage.removeItem('id_exam');
      console.log(this.diagnosis);
      
    },error =>{
    });
  }

  getAppointment(){
    const id = localStorage.getItem('id_exam');
    this.subscription = this.staffService.getScheduleByExam(Number(id)).subscribe(data => {
      this.reexam = data['results'][0];
      console.log(this.reexam);
      
      // localStorage.removeItem('id_exam');
    },error =>{

    });
  }

  getStaff(){
    this.subscription = this.staffService.getUserProfile().subscribe(data => {
      this.staff = data['results'][0];
    },error =>{
    });
  }

}
