import { Component, OnInit, OnDestroy } from '@angular/core';
// import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { formatDate } from '@angular/common';

const intersects = (startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date) =>
  (startTime1 < startTime2 && endTime1 > endTime2) ||
  (startTime2 <= startTime1 && startTime1 < endTime2) ||
  (startTime2 < endTime1 && endTime1 <= endTime2);

@Component({
  selector: 'app-admin-scheduler',
  templateUrl: './admin-scheduler.component.html',
  styleUrls: ['./admin-scheduler.component.css']
})
export class AdminSchedulerComponent implements OnInit, OnDestroy {
  public selectedDate: Date = new Date();
  public events: SchedulerEvent[] = [];
  public StartComponent: boolean = false;
  private listSchedule: any[] = [];
  subscription: Subscription;

  public formGroup: FormGroup;

  constructor(
    public adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;

    this.formGroup = this.formBuilder.group({
      'id': args.isNew ? this.getNextId() : dataItem.id,
      'start': [dataItem.start, Validators.required],
      'end': [dataItem.end, Validators.required],
      'startTimezone': [dataItem.startTimezone],
      'endTimezone': [dataItem.endTimezone],
      'isAllDay': dataItem.isAllDay,
      'title': dataItem.title,
      'description': dataItem.description,
      'recurrenceRule': dataItem.recurrenceRule,
      'recurrenceId': dataItem.recurrenceId,
      'roomId': dataItem.roomId,
      'attendees': [dataItem.attendees]
    }, {
      validator: this.startEndValidator
    });

    return this.formGroup;
  }

  public getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }

  public startEndValidator: ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('start').value;
    const end = fg.get('end').value;

    if (start !== null && end !== null && start.getTime() < end.getTime()) {
      return null;
    } else {
      return { range: 'End date must be greater than Start date' };
    }
  }

  ngOnInit() {
    this.loadSchedule();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadSchedule() {
    this.subscription = this.adminService.getScheduler().subscribe(data => {
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

  public onRemove(args: any): void {
    this.preventReadonly(args);
  }

  public onEdit(args: any): void {
    console.log("EDITTT");

    this.preventReadonly(args);
  }

  public onAdd(args: any): void {
    if (this.occupiedSlot(args.dataItem)) {
      alert('This time period is occupied.');
      args.preventDefault();
    }
  }

  private preventReadonly(args: any): void {
    if (args.dataItem.readonly) {
      alert('The event cannot be changed.');
      args.preventDefault();
    }
  }

  private occupiedSlot(args: any): boolean {
    let occupied = false;

    this.events.find(e => {
      if (e !== args.dataItem && intersects(args.start, args.end, e.start, e.end)) {
        occupied = true;
        return true;
      }
    });

    return occupied;
  }
}