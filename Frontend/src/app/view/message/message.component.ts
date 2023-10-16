import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Account} from "../../model/account";

@Component({
  selector: 'app-massage',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit
{
  message:string = 'title';
  error:string = '';
  targetPage:string = 'Home';

  num:number = 5;
  constructor(private router:ActivatedRoute)
  {

  }

  ngOnInit():void
  {
    // @ts-ignore
    let user:Account = JSON.parse( window.sessionStorage.getItem('healthCenterUser') );
    console.log(user);

    if(this.router.snapshot.params['message'] == 'logInSuccessful' && user != null)
    {
      this.message = 'Welcome Back ' + user.firstName + " " + user.lastName;
      if(user.type == 'DOCTOR')
      {
        this.targetPage = "doctor/appointment/today";
      }
      else if(user.type == 'ADMIN')
      {
        this.targetPage = "admin/dashboard";
      }
      else
      {
        this.targetPage = "home";
      }
    }
    else if(this.router.snapshot.params['message'] == 'message/signInSuccessful')
    {
      this.message = 'Sign In Successful';
      this.targetPage = "logIn";
    }
    else if(this.router.snapshot.params['message'] == 'logOutSuccessful' && user == null)
    {
      this.message = 'You Are Already Log Out';
      this.targetPage = "logIn";
    }
    else if(this.router.snapshot.params['message'] == 'updateSuccessful' && user != null)
    {
      this.message = 'Your Account Info Has Already Update';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'accessForbidden' && user != null)
    {
      this.message = '403 Access Forbidden';
      if(user.type == 'DOCTOR')
      {
        this.targetPage = "doctor/appointment/today";
      }
      else if(user.type == 'ADMIN')
      {
        this.targetPage = "admin/dashboard";
      }
      else
      {
        this.targetPage = "home";
      }
    }
    else if(this.router.snapshot.params['message'] == 'accessForbidden' && user == null)
    {
      this.message = '403 Access Forbidden';
      this.targetPage = "logIn";
    }
    else if(this.router.snapshot.params['message'] == 'makeAppointmentSuccessful')
    {
      this.message = 'Make Appointment Successful';
      this.targetPage = "home";
    }
    else if(this.router.snapshot.params['message'] == 'makeAppointmentFailed')
    {
      this.message = 'Make Appointment Failed, This Time Period Is Not Available.';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'addNewCaseSuccessful')
    {
      this.message = 'Add New Case Successful';
      this.targetPage = 'doctor/appointment/today';
    }
    else if(this.router.snapshot.params['message'] == 'cancelAppointmentSuccessful')
    {
      this.message = 'Cancel Appointment Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'updateAppointmentSuccessful')
    {
      this.message = 'Update Appointment Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'sendMessageSuccessful')
    {
      this.message = 'Send Message Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'deleteAccountSuccessful')
    {
      this.message = 'Delete Account Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'createDoctorSuccessful')
    {
      this.message = 'Create Doctor Successful';
      this.targetPage = 'admin/doctorList';
    }
    else if(this.router.snapshot.params['message'] == 'deleteDoctorSuccessful')
    {
      this.message = 'Delete Doctor Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'updateDoctorSuccessful')
    {
      this.message = 'Update Doctor Successful';
      this.targetPage = document.referrer;
    }
    else if(this.router.snapshot.params['message'] == 'adminResetUserPasswordSuccessful')
    {
      this.message = 'Reset Password Successful';
      this.targetPage = document.referrer;
    }
    else
    {
      this.message = 'Error: ' + this.router.snapshot.params['message'];
      this.targetPage = document.referrer;
    }

    setInterval(
      ()=>
      {
        if(this.num != 0)
        {
          // @ts-ignore
          document.getElementById('timer').innerHTML = '<h2>Jump after '+this.num+' seconds</h2>';
          this.num = this.num - 1;
        }
        else
        {
          this.num = 5;
          console.log(this.targetPage);
          window.location.href = this.targetPage;
        }
      },1000);
  }
}
