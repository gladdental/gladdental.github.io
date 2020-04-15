import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { DoctorService } from './../../../services/doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-customer-history',
  templateUrl: './doctor-customer-history.component.html',
  styleUrls: ['./doctor-customer-history.component.css']
})
export class DoctorCustomerHistoryComponent implements OnInit, OnDestroy {

  subscriptionParams: Subscription;
  subscription: Subscription;
  public Customer : any;
  public Examination : any [] = [];
  public Diagnosis : any [] = [];

  public ExamDetail : any;
  public Doctor : any;
  public _p : number = 1;
  public _total : number;

  constructor(
    public activatedRouterService: ActivatedRoute,
    public routerService: Router,
    public doctorService: DoctorService,
    public customerService: CustomerService
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
    this.subscriptionParams = this.activatedRouterService.params.subscribe(data => {
      this.subscription = this.customerService.filterExaminationByPatient(this._p,data['id']).subscribe( data => {
        this.Examination = data['results'];
        this._total = data['count'];
        console.log(this.Examination);
        
      });

      this.customerService.getDetailCustomer(data['id']).subscribe( data => {
        this.Customer = data;
      });
    });
  }

  changePage(event){
    this._p = event
    this.customerService.getPageCustomer(this._p).subscribe( data => {
      this.Customer = data['results'];
    });
  }

  getDetail(id_exam:number, index : number){
    this.subscription = this.customerService.filterDiagnosisByExam(id_exam).subscribe(data=>{
      this.Diagnosis = data;
      this.ExamDetail = this.Examination[index];
      this.Doctor = this.ExamDetail['docter'];
    },error =>{

    });
  }
}
