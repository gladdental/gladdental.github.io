import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { SharingDataService } from './../../../services/sharing-data.service';
import { StaffService } from './../../../services/staff.service';
import { Subscription } from 'rxjs';
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
  public invoice : any;
  public examination : any;
  public diagnosis : any[] = [];

  public patient : any;
  public doctor : any;
  public exam : any;
  public reexam : any;
  public staff : any;

  constructor(
    sharingDataService: SharingDataService,
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
    }else this.printInvoice();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  printInvoice(){ 
    this.subscription = this.staffService.getInvoice(Number(localStorage.getItem('id_invoice'))).subscribe( data =>{
      this.invoice = data;
      this.patient = data['examination']['patient'];
      this.doctor = data['examination']['docter'];
      this.exam = data['examination'];
      localStorage.removeItem('id_invoice');
    }, error =>{
    });

    this.getDiagnosis();
    this.getAppointment();
    this.printerService.printCurrentWindow();
  }

  async getDiagnosis(){
    const id = localStorage.getItem('id_exam');
    this.subscription = this.staffService.getDiagnosisByExam(Number(id)).subscribe(data => {
      this.diagnosis = data['results'];
      console.log(this.diagnosis);
      // localStorage.removeItem('id_exam');
    },error =>{
    });
  }

  getAppointment(){
    const id = localStorage.getItem('id_exam');
    this.subscription = this.staffService.getScheduleByExam(Number(id)).subscribe(data => {
      this.reexam = data['results'][0];
      console.log(this.reexam);
      localStorage.removeItem('id_exam');
    },error =>{

    });

    this.subscription = this.staffService.getUserProfile().subscribe(data => {
      this.staff = data['results'][0];
    },error =>{
    });
  }

}
