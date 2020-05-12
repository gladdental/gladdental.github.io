import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import { PrintService } from './../../../services/print.service';
import Swal from 'sweetalert2';
import {Renderer2} from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-staff-invoice-content',
  templateUrl: './staff-invoice-content.component.html',
  styleUrls: ['./staff-invoice-content.component.css']
})
export class StaffInvoiceContentComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  _p: number = 1;
  _total: number;
  public Invoice : any[] = [];
  public oneInvoice = {
    'voucher' : null,
    'owe' : null,
    'cost' : null,
    'payment' : null,
    'received' : null,
    'paid' : null
  };

  constructor(
    public staffService: StaffService,
    public printService: PrintService,
    public renderer : Renderer2,
    public router : Router
  ) { }

  ngOnInit() {
    this.loadInvoice();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadInvoice(){
    this.subscription = this.staffService.getListInvoice(this._p).subscribe( data=>{
      this.Invoice = data['results'];
      this._total = data['count'];
    },error =>{

    })
  }

  changePage(event){
    this._p = event;
    this.staffService.getListInvoice(this._p).subscribe( data => {
      this.Invoice = data['results'];
    });
  }

  detailInvoice(id){
    this.subscription = this.staffService.getInvoice(id).subscribe( data => {
      this.oneInvoice = data;
      console.log(this.oneInvoice);
      
    },error =>{
      Swal.fire({
        title: 'Error!',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  updateInvoice(received,paid){
    this.subscription = this.staffService.editInvolve(this.oneInvoice['id'],received,paid).subscribe( data => {
      this.loadInvoice();
      this.oneInvoice = null;
    },error =>{
      Swal.fire({
        title: 'Error!',
        text: error.error,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  onPrintInvoice(id_invoice,id_exam) {
    localStorage.setItem('id_exam', id_exam);
    localStorage.setItem('id_invoice',id_invoice);
    // window.open(window + "/examination/print", '_blank');
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/examination/print'])
    );
    // window.open("http://localhost:4200/examination/print", "_blank");
    window.open(url, '_blank');
    
  }
}