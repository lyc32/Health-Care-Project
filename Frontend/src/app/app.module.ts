import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DoctorDashboardComponent } from "./view/doctor-dashboard/doctorDashboard.component";
import { AccountInfoComponent } from './view/account-info/account-info.component';
import { LoginComponent } from './view/login/login.component';
import { SigninComponent } from './view/signin/signin.component';
import { MessageComponent } from './view/message/message.component';
import { SearchAppointmentComponent } from './view/search-appointment/search-appointment.component';
import { AdminDashboardComponent } from './view/admin-dashboard/admin-dashboard.component';
import { CalendarComponent } from './view/calendar/calendar.component';
import { MakeAppointmentComponent } from './view/make-appointment/makeAppointment.component';
import { DoctorListComponent } from './view/doctor-list/doctor-list.component';
import { HomeComponent } from './view/home/home.component';
import { MyAppointment } from './view/person-MyAppointment/myAppointment';
import { SearchCustomerComponent } from './view/search-customer/search-customer.component';
import { DoctorProfileComponent } from './view/doctor-profile/doctor-profile.component';

@NgModule({
  declarations: [
    AppComponent,

    DoctorDashboardComponent,
    AccountInfoComponent,

    LoginComponent,
    SigninComponent,
    MessageComponent,
    SearchAppointmentComponent,
    AdminDashboardComponent,

    CalendarComponent,
    MakeAppointmentComponent,
    DoctorListComponent,
    HomeComponent,
    MyAppointment,
    SearchCustomerComponent,
    DoctorProfileComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
