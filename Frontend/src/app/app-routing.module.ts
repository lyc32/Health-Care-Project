import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from "./view/doctor-dashboard/doctorDashboard.component";
import { LoginComponent } from "./view/login/login.component";
import { SigninComponent } from "./view/signin/signin.component";
import {MessageComponent} from "./view/message/message.component";
import {AccountInfoComponent} from "./view/account-info/account-info.component";
import {SearchAppointmentComponent} from "./view/search-appointment/search-appointment.component";
import {AdminDashboardComponent} from "./view/admin-dashboard/admin-dashboard.component";
import { MakeAppointmentComponent } from './view/make-appointment/makeAppointment.component';
import { DoctorListComponent } from './view/doctor-list/doctor-list.component';
import { HomeComponent } from './view/home/home.component';
import { MyAppointment} from "./view/person-MyAppointment/myAppointment";
import { SearchCustomerComponent } from './view/search-customer/search-customer.component';
import {DoctorProfileComponent} from "./view/doctor-profile/doctor-profile.component";
const routes: Routes = [
  // All Account
  {path:"logIn"                   , component:LoginComponent},
  {path:"signIn"                  , component:SigninComponent},
  {path:"myAccount/:type"         , component:AccountInfoComponent},
  {path:"home"                    , component:HomeComponent},
  // Doctor
  {path:"doctor/appointment/:date", component:DoctorDashboardComponent},
  // Admin
  {path:"admin/dashboard"         , component:AdminDashboardComponent},
  {path:"admin/create/doctor"     , component:SigninComponent},
  {path:"admin/doctorList"        , component:DoctorListComponent},
  {path:"admin/search/customer"   , component:SearchCustomerComponent},
  // Doctor & Amdin
  {path:":role/search/appointment", component:SearchAppointmentComponent},
  // Person
  {path:"customer/makeAppointment", component:MakeAppointmentComponent},
  {path:"customer/myAppointment"  , component:MyAppointment},
  {path:"customer/doctorProfile/:id", component:DoctorProfileComponent},
  // massage
  {path:"message/:message"      , component:MessageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

