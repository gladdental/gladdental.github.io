import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { SubjectComponent } from './components/customer/subject/subject.component';
import { SubjectDetailComponent } from './components/customer/subject-detail/subject-detail.component';
import { CourseComponent } from './components/customer/course/course.component';
import { CourseDetailComponent } from './components/customer/course-detail/course-detail.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { HomeComponent } from './components/customer/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FooterComponent } from './components/customer/footer/footer.component';
import { HeaderComponent } from './components/customer/header/header.component';
import { AdminBaseComponent } from './components/admin/admin-base/admin-base.component';
import { RegistrationComponent } from './components/admin/registration/registration.component';
import { RegistrationDetailComponent } from './components/admin/registration-detail/registration-detail.component';
import { AdminClassesComponent } from './components/admin/admin-classes/admin-classes.component';
import { AdminClassDetailComponent } from './components/admin/admin-class-detail/admin-class-detail.component';

import { AuthGuard } from './services/guard/auth.guard';
import { MyCoursesComponent } from './components/customer/my-courses/my-courses.component';
import { ScheduleComponent } from './components/customer/schedule/schedule.component';

const appRoutes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path : 'home',
    component: HomeComponent
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path : 'signup',
    component: SignUpComponent
  },
  {
    path : 'subjects',
    component: SubjectComponent
  },
  {
    path : 'subjects/:id',
    component: SubjectDetailComponent
  },
  {
    path : 'courses',
    component: CourseComponent
  },
  {
    path : 'courses/:id',
    component: CourseDetailComponent
  },
  {
    path : 'my-courses',
    component: MyCoursesComponent
  },
  {
    path : 'schedual',
    component: ScheduleComponent
  },
  {
    path : 'admin',
    component: AdminBaseComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path : '',
        component : AdminHomeComponent,
      },
      {
        path : 'registration',
        component : RegistrationComponent,
      },
      {
        path : 'registration/:id',
        component : RegistrationDetailComponent,
      },
      {
        path : 'classes',
        component : AdminClassesComponent,
      },
      {
        path : 'classes/:id',
        component : AdminClassDetailComponent,
      },
    ],
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubjectComponent,
    SubjectDetailComponent,
    CourseComponent,
    CourseDetailComponent,
    SignUpComponent,
    HomeComponent,
    AdminHomeComponent,
    FooterComponent,
    HeaderComponent,
    AdminBaseComponent,
    RegistrationComponent,
    RegistrationDetailComponent,
    AdminClassesComponent,
    AdminClassDetailComponent,
    MyCoursesComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
