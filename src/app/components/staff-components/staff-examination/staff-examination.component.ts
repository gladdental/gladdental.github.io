import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './../../../services/user.service';
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
  public detailExam = {
    "id": null,
    "docter" : {
      "id" : null,
      "name": null
    },
    "note" : null
  };
  public doctors: any[] = [];

  constructor(
    public staffService: StaffService,
    public userService: UserService,
    public printService: PrintService,
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
    });
  }

  public involve ={
    'cost' : null,
    'owe' : null,
    'voucher' : null,
  };
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

  changePage(event){
    this._p = event;
    this.subscription = this.staffService.getListExamination(this._p).subscribe(data => {
      this.Examination = data['results'];
    }, error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    })
  }

  onPrint() {
    localStorage.setItem('id_exam', '21');
    localStorage.setItem('id_invoice','17');
    
    window.open(window.location.href + "/print", '_blank');
    // this.routerService.navigateByUrl('examination/print');
  }

  onDelete(id){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa phiếu khám này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.staffService.deleteExamination(id).subscribe(res => {
          this.loadExamination();
          Swal.fire(
            'Đã xóa!',
            'Xóa thành công.',
            'success'
          )
        },error => {
          var message = JSON.stringify(error.error)
          Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }

  getDetail(id){
    this.userService.getListDoctor().subscribe(res => {
      this.doctors = res;
    });

    this.staffService.getExaminationById(id).subscribe(res => {
      this.detailExam = res;
    });
  }

  onUpdate(id_doctor,note){
    this.subscription = this.staffService.updateExamination(this.detailExam['id'],id_doctor,note).subscribe(res => {
      Swal.fire({
        title: 'Success',
        text: 'Cập nhật thành công',
        icon: 'success',
      });
      this.loadExamination();
    },error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }) 
  }

}
