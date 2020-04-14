import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { StaffService } from './../../../services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css']
})
export class StaffScheduleComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public Schedule:  any[] = [];
  _p : number = 1;
  _total : number;

  constructor(
    public staffService : StaffService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
    }
  }
}
