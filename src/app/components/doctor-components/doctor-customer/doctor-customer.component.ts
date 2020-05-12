import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { DoctorService } from './../../../services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-customer',
  templateUrl: './doctor-customer.component.html',
  styleUrls: ['./doctor-customer.component.css']
})
export class DoctorCustomerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public _p: number = 1;
  public _total: number;
  public Customer : any[] = [];
  private isCheckExamined : boolean = false;

  constructor(
    public docterService: DoctorService,
    public customerService : CustomerService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.customerService.getPageCustomer(this._p).subscribe( data =>{
      this.Customer = data['results'];
      this._total = data['count'];
    },error =>{

    });
  }

  filterCustomerByDoctor(){
    this.subscription = this.customerService.filterCustomerByDoctor(this._p).subscribe( data =>{
      this.Customer = data['results'];
      this._total = data['count'];
    },error =>{

    });
  }

  changePage(event){
    // console.log(event);
    this._p = event
    this.customerService.getPageCustomer(this._p).subscribe( data => {
      this.Customer = data['results'];
    });
  }

  onCheckExamined(){
    console.log("SOMETHING");
    
    this.isCheckExamined = !this.isCheckExamined;
    if(this.isCheckExamined){
      this._p = 1;
      this.filterCustomerByDoctor();
    }else{
      this._p = 1;
      this.loadData();
    }
  }
}
