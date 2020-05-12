import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../../services/subject.service';
import { Subject } from './../../../models/subjects.model';
import { EduProgramService } from './../../../services/edu-program.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {

  subscriptionParams: Subscription;
  subscription: Subscription;
  subject: Subject;

  constructor(
    public activatedRouterService: ActivatedRoute,
    public subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.subscription || this.subscriptionParams) {
      this.subscription.unsubscribe();
      this.subscriptionParams.unsubscribe();
    }
  }

  loadData() {
    this.subscriptionParams = this.activatedRouterService.params.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.subscription = this.subjectService.getOneSubject(data['id']).subscribe( (sub: Subject) => {
        this.subject = sub;
      });
    });
  }

}
