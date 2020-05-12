import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { AdminService } from './../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-schedule-table',
  templateUrl: './admin-schedule-table.component.html',
  styleUrls: ['./admin-schedule-table.component.css']
})
export class AdminScheduleTableComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public Schedule:  any[] = [];
  _p : number = 1;
  _total : number;
  public ScheduleDetail : object = {
    'name' : null,
    'email': null,
    'phone' : null,
    'date': null,
    'time' : null,
    'note': null,
  };
  public listFreeTime : any[] = ['8:00','9:00','10:00','11:00','13:00','14:00','15:00','16:00'];
  private options = false;
  constructor(
    public adminService : AdminService
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadData(page){
    this._p = page;
    this.subscription = this.adminService.getScheduleByTime(this._p).subscribe( data => {
      this.Schedule = data['results'];
      this._total = data['count'];
    });
  }

  getScheduleDetail(id,index){
    this.ScheduleDetail = this.Schedule[index];
    this.subscription = this.adminService.getFreeTimeList(this.ScheduleDetail['date']).subscribe(data =>{
      this.listFreeTime = data;
    },error =>{
      console.log(error);
    });
  }

  onPickDate(date){
    this.subscription = this.adminService.getFreeTimeList(date).subscribe(data =>{
      this.listFreeTime = data;
    },error =>{
      console.log(error);
    });
  }

  onUpdateSchedule(name,email,phone,date,time,note){
    this.subscription = this.adminService.updateSchedule(this.ScheduleDetail['id'],name,email,phone,date,time,note).subscribe( res =>{
      this.loadData(1);
      Swal.fire({
        title: 'Success',
        text: 'Cập nhật thành công',
        icon: 'success',
      });
    },error =>{
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    })
  }

  changeOption(value: boolean){
    this.options = value;
    if(value){
      this.loadToday(1);
    }else{
      this.loadData(1);
    }
  }

  loadToday(page: number){
    this._p = page;
      this.adminService.getScheduleToday(this._p).subscribe(data => {
        this.Schedule = data['results'];
        this._total = data['count'];
      },error=>{
        console.log(error);
      });
  }

  changePage(event){
    this._p = event;
    if (this.options){
      this.loadToday(this._p);
    }else{
      this.loadData(this._p);
    }
  }

  deleteSchedule(id){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa đăng ký này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteSchedule(id).subscribe(res => {
          this.loadData(1);
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
            confirmButtonText: 'Cool'
          });
        });
      }
    });
  }
}
