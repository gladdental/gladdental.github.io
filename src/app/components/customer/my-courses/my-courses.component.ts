import { Component, OnInit } from '@angular/core';
import { StudentCoursesService } from 'src/app/services/student-courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  // allCourses: any[] = [];
  // pendingCourses: any[] = [];
  // approvedCourses: any[] = [];
  // registeredCourses: any[] = [];
  showedCourses: any[] = [];

  constructor(
    public studentCourseService: StudentCoursesService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.studentCourseService.getAllRegistrations().subscribe( all => {
      this.showedCourses = all;
      console.log(this.showedCourses);
    });
  }

  onChange(value) {
    switch (value) {
      case 1:
        this.studentCourseService.getPendingRegistrations().subscribe( pending => {
          this.showedCourses = new Array();
          this.showedCourses = pending;
        });
        break;
      case '2':
        this.studentCourseService.getApprovedRegistrations().subscribe( approved => {
          this.showedCourses = new Array();
          this.showedCourses = approved;
        });
        break;
      case '3':
        this.studentCourseService.getSuccessfulRegistrations().subscribe( registered => {
          this.showedCourses = new Array();
          this.showedCourses = registered;
        });
        break;
      default:
        this.studentCourseService.getAllRegistrations().subscribe( all => {
          this.showedCourses = new Array();
          this.showedCourses = all;
        });
        break;
    }
  }

}
