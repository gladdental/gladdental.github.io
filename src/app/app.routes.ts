import { Routes } from '@angular/router';

import { HomePageComponent } from './components/staff-components/home-page/home-page.component';
import { CustomerComponent } from './components/staff-components/customer/customer.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationComponent } from './components/staff-components/registration/registration.component';

//Admin Router
import { UserManagementComponent } from './components/admin-components/user-management/user-management.component';
import { TreatmentComponent } from './components/admin-components/treatment/treatment.component';
import { AdminHomePageComponent } from './components/admin-components/admin-home-page/admin-home-page.component';
import { UserDetailComponent } from './components/admin-components/user-detail/user-detail.component';
import { ServiceComponent } from './components/admin-components/service/service.component';
import { TreatmentDetailComponent } from './components/admin-components/treatment-detail/treatment-detail.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';

//Doctor Router
import { DocterExaminationComponent } from './components/doctor-components/docter-examination/docter-examination.component';
import { DocterHomePageComponent } from './components/doctor-components/docter-home-page/docter-home-page.component';

import { RequiredLoginGuard } from './services/guard/required-login.guard';
import { RequiredAdminLoginGuard } from './services/guard/required-admin-login.guard';
import { RequiredDoctorLoginGuard } from './services/guard/required-doctor-login.guard';
import { StaffExaminationComponent } from './components/staff-components/staff-examination/staff-examination.component';
import { PrintInvolveLayoutComponent } from './components/staff-components/print-involve-layout/print-involve-layout.component';
import { StaffInvoiceComponent } from './components/staff-components/staff-invoice/staff-invoice.component';
import { PrintExaminationLayoutComponent } from './components/staff-components/print-examination-layout/print-examination-layout.component';
import { StaffInvoiceContentComponent } from './components/staff-components/staff-invoice-content/staff-invoice-content.component';
import { StaffHistoryComponent } from './components/staff-components/staff-history/staff-history.component';
import { DoctorCustomerComponent } from './components/doctor-components/doctor-customer/doctor-customer.component';
import { StaffScheduleComponent } from './components/staff-components/staff-schedule/staff-schedule.component';
import { StaffScheduleTableComponent } from './components/staff-components/staff-schedule-table/staff-schedule-table.component';
import { StaffSchedulerComponent } from './components/staff-components/staff-scheduler/staff-scheduler.component';

//Comon coponents
import { DoctorCustomerHistoryComponent } from './components/doctor-components/doctor-customer-history/doctor-customer-history.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        canActivate : [RequiredLoginGuard],
        children: [
            {
                path: '',
                component: CustomerComponent,
            },
            {
                path: 'customer/:id',
                component: StaffHistoryComponent,
            },
            {
                path: 'registration',
                component: RegistrationComponent,
            },
            {
                path: 'schedule',
                component: StaffScheduleComponent,
                children : [
                    {
                        path: '',
                        component: StaffScheduleTableComponent,
                    },
                    {
                        path: 'scheduler',
                        component: StaffSchedulerComponent,
                    }
                ]
            },
            {
                path: 'examination',
                component: StaffExaminationComponent,
            },
            {
                path: 'invoice',
                component: StaffInvoiceComponent,
                children : [
                    {
                        path: '',
                        component: StaffInvoiceContentComponent,
                    },
                ]
            },
        ],
    },
    {
        path: 'admin',
        component: AdminHomePageComponent,
        canActivate : [RequiredAdminLoginGuard],
        children: [
            {
                path: '',
                component: AdminDashboardComponent,
            },
            {
                path: 'user',
                component: UserManagementComponent,
            },
            {
                path : 'user/:id',
                component: UserDetailComponent
            },
            {
                path: 'treatment',
                component: TreatmentComponent,
            },
            {
                path : 'treatment/:id',
                component: TreatmentDetailComponent,
            },
            {
                path: 'service',
                component: ServiceComponent,
            },
        ],
    },
    {
        path: 'doctor',
        component: DocterHomePageComponent,
        canActivate : [RequiredDoctorLoginGuard],
        children: [
            {
                path: '',
                component: DocterExaminationComponent,
            },
            {
                path: 'customer',
                component: DoctorCustomerComponent,
            },
        ],
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'comon/customer/:id',
        component: DoctorCustomerHistoryComponent
    },
    {
        path: 'examination/print',
        component: PrintInvolveLayoutComponent,
    },
    {
        path: 'printer/printexamination',
        component: PrintExaminationLayoutComponent,
    },
    {
        path: '**',
        component: Page404Component
    },
];