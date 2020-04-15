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
  public ScheduleDetail : any;
  public listFreeTime : any[] = ['8:00','9:00','10:00','11:00','13:00','14:00','15:00','16:00'];

  constructor(
    public staffService : StaffService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }

  loadData(){
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
      this.loadData();
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

}
