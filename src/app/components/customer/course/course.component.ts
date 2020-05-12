import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  courses: Course[];

  constructor(
    public courseService: CourseService
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCourses() {
    this.subscription = this.courseService.getAllCourses().subscribe( (data: Course[] ) => {
      this.courses = data;
    });
  }

}
