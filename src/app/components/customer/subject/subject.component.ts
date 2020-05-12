import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from './../../../models/subjects.model';
import { SubjectService } from './../../../services/subject.service';
import { Subscription } from 'rxjs';
import { EduProgramService } from './../../../services/edu-program.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  subjects: Subject[] = [];
  subscription: Subscription;

  constructor(
    public subjectService: SubjectService,
    public eduProgramService: EduProgramService
  ) { }

  ngOnInit() {
    this.loadSubjects();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadSubjects() {
    this.subscription = this.subjectService.getAllSubjects().subscribe( (data: Subject[] ) => {
      this.subjects = data;
    });
  }
}
