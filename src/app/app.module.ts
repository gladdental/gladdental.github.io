import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
// import { Routes } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxPrinterModule } from 'ngx-printer';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CountUpModule } from 'ngx-countup';


//GUARD
import { RequiredLoginGuard } from './services/guard/required-login.guard';
import { RequiredAdminLoginGuard } from './services/guard/required-admin-login.guard';
import { RequiredDoctorLoginGuard } from './services/guard/required-doctor-login.guard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/staff-components/home-page/home-page.component';
import { CustomerComponent } from './components/staff-components/customer/customer.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserManagementComponent } from './components/admin-components/user-management/user-management.component';
import { TreatmentComponent } from './components/admin-components/treatment/treatment.component';
import { AdminHomePageComponent } from './components/admin-components/admin-home-page/admin-home-page.component';
import { UserDetailComponent } from './components/admin-components/user-detail/user-detail.component';
import { ServiceComponent } from './components/admin-components/service/service.component';
import { DocterExaminationComponent } from './components/doctor-components/docter-examination/docter-examination.component';
import { DocterHomePageComponent } from './components/doctor-components/docter-home-page/docter-home-page.component';
import { TreatmentDetailComponent } from './components/admin-components/treatment-detail/treatment-detail.component';
import { RegistrationComponent } from './components/staff-components/registration/registration.component';
import { StaffExaminationComponent } from './components/staff-components/staff-examination/staff-examination.component';
import { PrintInvolveLayoutComponent } from './components/staff-components/print-involve-layout/print-involve-layout.component';

import {SharingDataService} from "src/app/services/sharing-data.service";
import { StaffInvoiceComponent } from './components/staff-components/staff-invoice/staff-invoice.component';
import { PrintExaminationLayoutComponent } from './components/staff-components/print-examination-layout/print-examination-layout.component';
import { StaffInvoiceContentComponent } from './components/staff-components/staff-invoice-content/staff-invoice-content.component';
import { StaffResultContentComponent } from './components/staff-components/staff-result-content/staff-result-content.component';
import { StaffHistoryComponent } from './components/staff-components/staff-history/staff-history.component';
import { DoctorCustomerComponent } from './components/doctor-components/doctor-customer/doctor-customer.component';
import { DoctorCustomerHistoryComponent } from './components/doctor-components/doctor-customer-history/doctor-customer-history.component';
import { StaffScheduleComponent } from './components/staff-components/staff-schedule/staff-schedule.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffScheduleTableComponent } from './components/staff-components/staff-schedule-table/staff-schedule-table.component';
import { StaffSchedulerComponent } from './components/staff-components/staff-scheduler/staff-scheduler.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';
import { PrintInvoiceComponent } from './components/common/print-invoice/print-invoice.component';
import { DoctorDiagnosisComponent } from './components/doctor-components/doctor-diagnosis/doctor-diagnosis.component';
import { AdminScheduleComponent } from './components/admin-components/admin-schedule/admin-schedule.component';
import { AdminScheduleTableComponent } from './components/admin-components/admin-schedule-table/admin-schedule-table.component';
import { AdminSchedulerComponent } from './components/admin-components/admin-scheduler/admin-scheduler.component';
import { DoctorExaminationhistoryComponent } from './components/doctor-components/doctor-examinationhistory/doctor-examinationhistory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CustomerComponent,
    Page404Component,
    LoginPageComponent,
    UserManagementComponent,
    TreatmentComponent,
    AdminHomePageComponent,
    UserDetailComponent,
    ServiceComponent,
    DocterExaminationComponent,
    DocterHomePageComponent,
    TreatmentDetailComponent,
    RegistrationComponent,
    StaffExaminationComponent,
    PrintInvolveLayoutComponent,
    StaffInvoiceComponent,
    PrintExaminationLayoutComponent,
    StaffInvoiceContentComponent,
    StaffResultContentComponent,
    StaffHistoryComponent,
    DoctorCustomerComponent,
    DoctorCustomerHistoryComponent,
    StaffScheduleComponent,
    StaffScheduleTableComponent,
    StaffSchedulerComponent,
    AdminDashboardComponent,
    PrintInvoiceComponent,
    DoctorDiagnosisComponent,
    AdminScheduleComponent,
    AdminScheduleTableComponent,
    AdminSchedulerComponent,
    DoctorExaminationhistoryComponent,
  ],
  imports: [
    BrowserModule,
    NgxPrinterModule.forRoot({printOpenWindow: true}),
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    CrystalLightboxModule,
    CKEditorModule,
    CountUpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SchedulerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    RequiredLoginGuard,
    RequiredAdminLoginGuard,
    RequiredDoctorLoginGuard,
    SharingDataService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
