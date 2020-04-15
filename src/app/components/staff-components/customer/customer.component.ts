import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { UserService } from './../../../services/user.service';
import { StaffService } from './../../../services/staff.service';
import { detailuser } from '../../../models/customer.class';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public customer: any[] = [];
  public gender: boolean = true;
  public genderDetail: boolean = true;
  public currentUserID: number;
  public doctors: any[];
  id_patient: number = null;
  _p: number = 1;
  _total: number;
  public is_reexam: boolean = false;
  public id_ers: number = null;
  public isToggleChecked: boolean = false;
  public ExamResult: any[] = [];
  private selectedERS: number;
  public UserDetail : any;

  // public UserDetail : any;

  constructor(
    public customerService: CustomerService,
    public userService: UserService,
    public staffService: StaffService,
  ) { }

  ngOnInit() {
    this.loadCustomer();
    // this.userdetailname = "AAAAA";
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCustomer() {
    this.subscription = this.customerService.getListCustomer().subscribe(data => {
      this.customer = data['results'];
      this._total = data['count'];
      console.log(this.customer);

    }, error => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  addUser(name, phone) {
    this.customerService.addCustomer(name, phone, this.gender).subscribe(data => {
      this.loadCustomer();
      Swal.fire({
        title: 'Success',
        text: 'Đã thêm thông tin một khách hàng',
        icon: 'success',
      });
    },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Không thành công',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      });
  }

  onChangeGender(value) {
    this.gender = value;
  }

  onChangeDetailGender(value) {
    this.genderDetail = value;
  }

  getCustomer(id) {
    this.currentUserID = id;
  }

  detailCustomer(id) {
    this.customerService.getDetailCustomer(id).subscribe(data => {
      this.UserDetail = data;
      console.log(this.UserDetail);
      
      this.genderDetail = data['gender'];
    });
  }

  deleteCustomer(id){
    this.customerService.deleteCustomer(id).subscribe(data => {
      this.loadCustomer();
      Swal.fire({
        title: 'Success',
        text: 'Khôi phục mật khẩu thành công',
        icon: 'success',
      });
    },error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  updateUser(name, phone) {
    this.customerService.updateCustomer(this.UserDetail['id'], name, phone, this.genderDetail).subscribe(data => {
      this.loadCustomer();
    });
  }

  loadListDoctor(id) {
    this.id_patient = id;
    this.userService.getListDoctor().subscribe(res => {
      this.doctors = res;
    });
    this.staffService.filterExamResult(id).subscribe(res => {
      this.ExamResult = res['results'];
      if (this.ExamResult.length > 0) {
        this.selectedERS = res['results'][0]['id'];
        this.is_reexam = true;
      }
      else {
        this.is_reexam = false;
      }
      console.log(this.is_reexam);

    }, error => {
      console.log(error);

    });
  }

  onCreateExamination(doctor, note) {
    this.staffService.createExamination(doctor, this.id_patient, note, this.isToggleChecked, null).subscribe(res => {
      this.id_patient = null;
      localStorage.setItem('id_exam', res );
      window.open(window.location.href + "/printer/printexamination", '_blank');
    });
  }

  onCreateReExamination(doctor, note) {
    this.staffService.createExamination(doctor, this.id_patient, note, this.is_reexam, this.selectedERS).subscribe(res => {
      this.id_patient = null;
    });
  }

  changePage(event) {
    // console.log(event);
    this._p = event
    this.customerService.getPageCustomer(this._p).subscribe(data => {
      this.customer = data['results'];
    });
  }

  onSearch(query) {
    this.customerService.searchCustomer(query).subscribe(data => {
      this.customer = data['results'];
    })
  }

  onCheck() {
    this.isToggleChecked = !this.isToggleChecked;
    console.log(this.isToggleChecked);
  }

  changeSelect(id: number) {
    console.log(id);
    this.selectedERS = id;
  }

  printPage(){
    window.print();
  }
}
