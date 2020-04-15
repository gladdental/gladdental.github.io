import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { DoctorService } from './../../../services/doctor.service';
import { UserService } from './../../../services/user.service';
import {Renderer2} from '@angular/core';
import Swal from 'sweetalert2';

import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-docter-home-page',
  templateUrl: './docter-home-page.component.html',
  styleUrls: ['./docter-home-page.component.css']
})
export class DocterHomePageComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  public User : any = [];
  public StartComponent: boolean = false;
  public selectedDate: Date = new Date();
  public events: SchedulerEvent[] = [];
  private listSchedule: any[] = [];

  constructor(
    public userService : UserService,
    public doctorService : DoctorService
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onLogout(){
    localStorage.removeItem('bearToken');
    window.location.reload();
  }

  loadProfile(){
    this.subscription = this.userService.getUserProfile().subscribe( data => {
      this.User = data['results'][0]; 
    }, error => {
      console.log(error);
    })
  }

  loadSchedule(){
    this.subscription = this.doctorService.getScheduler().subscribe(data => {
      this.listSchedule = data;
      let i = 0;
      this.listSchedule.forEach(element => {
        let endtime = element.time;
        let changeHour = Number(endtime.slice(0, 2)) + 1;
        let Hour = "";
        if (changeHour < 10) {
          Hour = "0" + changeHour.toString();
        } else Hour = changeHour.toString();
        endtime = Hour + endtime.slice(2);
        let temp;
        if (element.is_reexam) {
          temp = {
            id: i + 1,
            title: element.pre_examination.patient.name + " - " + element.pre_examination.patient.phone + " - " + element.detail,
            description: element.detail,
            start: new Date(element.date + 'T' + element.time),
            end: new Date(element.date + 'T' + endtime),
            readonly: true
          };
        } else {
          temp = {
            id: i + 1,
            title: element.name + " - " + element.phone + " - " + element.message,
            start: new Date(element.date + 'T' + element.time),
            end: new Date(element.date + 'T' + endtime)
          };
        }
        i++;
        this.events.push(temp);
      });
      this.StartComponent = true;
      const today = formatDate(new Date(), 'yyyy-MM-dd', 'en', '+0700');
      this.selectedDate = new Date(today);
    });
  }
}
