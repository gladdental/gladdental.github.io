import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import { PrintService } from './../../../services/print.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-invoice',
  templateUrl: './staff-invoice.component.html',
  styleUrls: ['./staff-invoice.component.css']
})
export class StaffInvoiceComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  // _p: number = 1;
  // _total: number;
  // public Invoice : any[] = [];

  constructor(
    // public staffService: StaffService,
    // public printService: PrintService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
