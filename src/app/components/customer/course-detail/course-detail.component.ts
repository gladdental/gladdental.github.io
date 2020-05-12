import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';
import { Subject } from 'src/app/models/subjects.model';
import { UserService } from 'src/app/services/user.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  subscriptionParams: Subscription;
  subscription: Subscription;
  course: Course;
  subjects: Subject[] = [];
  totalCredits = 0;

  constructor(
    public activatedRouterService: ActivatedRoute,
    public courseService: CourseService,
    public routerService: Router,
    public userService: UserService,
    public enrollmentService: EnrollmentService
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
      this.subscription = this.courseService.getOneCourse(data['id']).subscribe( (crs: Course) => {
        this.course = crs;
        this.subjects = crs['subject'];

        for (const i of this.subjects) {
          this.totalCredits += i.credit;
        }
      });
    });
  }

  register() {
    Swal.fire({
      title: '<strong>Are you sure to register to this course?</strong>',
      text: 'Register to ' + this.course.program_id.name + ' course!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I agree!'
    }).then((result) => {
      if (result.value) {
        if (localStorage.getItem('username') == null) {
          Swal.fire({
            title: 'Rejected request!',
            text: 'You have not logged in',
            type: 'error',
            showCancelButton: true,
            confirmButtonText: 'Go for login'
          }).then((result) => {
            if (result.value) {
              this.routerService.navigateByUrl('login');
            }
          });
        } else {
          // const crsID = {
          //   'course_id' : this.course.id
          // };
          // const course = JSON.stringify(crsID);
          this.enrollmentService.enroll(this.course.id).subscribe( data => {
            Swal.fire({
              position: 'top',
              type: 'success',
              title: 'Successful resgistration!',
              text: 'Please wait for the admin to approve your enrollment',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            Swal.fire({
              type: 'error',
              title: 'You have already registered to this course!',
              text: 'Please wait for the admin to approve your enrollment',
            });
          });
        }
      }
    });
  }

}
