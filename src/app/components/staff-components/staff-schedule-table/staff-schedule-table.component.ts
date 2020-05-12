import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-schedule-table',
  templateUrl: './staff-schedule-table.component.html',
  styleUrls: ['./staff-schedule-table.component.css']
})
export class StaffScheduleTableComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public Schedule:  any[] = [];
  _p : number = 1;
  _total : number;
  public options : boolean = false;
  public ScheduleDetail : object = {
    'name' : null,
    'email': null,
    'phone' : null,
    'date': null,
    'time' : null,
    'note': null,
  };
  public listFreeTime : any[] = ['8:00','9:00','10:00','11:00','13:00','14:00','15:00','16:00'];

  constructor(
    public staffService : StaffService,
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadData(page: number){
    this._p = page;
    this.subscription = this.staffService.getScheduleByTime(this._p).subscribe( data => {
      this.Schedule = data['results'];
    })
  }

  getScheduleDetail(id,index){
    this.ScheduleDetail = this.Schedule[index];
    this.subscription = this.staffService.getFreeTimeList(this.ScheduleDetail['date']).subscribe(data =>{
      this.listFreeTime = data;
    },error =>{
      console.log(error);
    });
  }

  onPickDate(date){
    this.subscription = this.staffService.getFreeTimeList(date).subscribe(data =>{
      this.listFreeTime = data;
    },error =>{
      console.log(error);
    });
  }

  onUpdateSchedule(name,email,phone,date,time,note){
    this.subscription = this.staffService.updateSchedule(this.ScheduleDetail['id'],name,email,phone,date,time,note).subscribe( res =>{
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
    });
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
      this.staffService.getScheduleToday(this._p).subscribe(data => {
        this.Schedule = data['results'];
        this._total = data['count'];
      },error=>{
        console.log(error);
      });
  }

  deleteSchedule(id){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa tài khoản này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.staffService.RejectScheduleRegistration(id).subscribe(res => {
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
