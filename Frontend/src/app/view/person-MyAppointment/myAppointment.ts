import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentService } from 'src/app/service/appointment-service';
import { CalendarService } from 'src/app/service/calendar.service';
import {Account} from "../../model/account";
import {DoctorDetail} from "../../model/doctor-detail";
import {AppointmentDetails} from "../../model/appointment-details";
import { Menus } from 'src/app/menus/menus';
import {Message} from "../../model/message";
import { MessageService } from 'src/app/service/message-service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './myAppointment.html',
  styleUrls: ['./myAppointment.css']
})
export class MyAppointment implements OnInit{

  menus:Menus = new Menus();
  availableTime:number[] = [900, 1000, 1100, 1300, 1400, 1500, 1600];
  showSendMessage = false;

  currentDate:number = -1;
  checkDate:string = '';
  currentAppointmentDate:number = -1;
  currentAppointmentDateString:string = '';

  myAppointments : Appointment[] = [];
  myCurrentAppointments : Appointment[] = [];

  filterAppointment: Appointment = new Appointment();

  currentAppointment:Appointment = new Appointment();
  currentAppointmentDetails:AppointmentDetails = new AppointmentDetails();
  user:Account = new Account();
  constructor(private appointmentService : AppointmentService, private messageService : MessageService){}

  ngOnInit(): void
  {
    this.currentDate = new Date().getFullYear()*10000 + (new Date().getMonth()+1)*100 + new Date().getDate();
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    if(this.user == null)
    {
      window.location.href = "message/accessForbidden";
    }
    this.getAppointments();
  }

  private getAppointments()
  {
    this.appointmentService.getAppointmentByPersonId(this.user.id).subscribe(
      data =>{
        this.myAppointments = data;
        this.myCurrentAppointments = this.myAppointments;
      }
    )
  }

  filter()
  {
    this.myCurrentAppointments = this.myAppointments.filter(a => this.compare(a));
  }

  compare(a:Appointment)
  {
    if(this.filterAppointment.doctor_name != '' && a.doctor_name != this.filterAppointment.doctor_name)
    {
      return false;
    }
    if(this.filterAppointment.fee != -1 && a.fee != this.filterAppointment.fee)
    {
      return false;
    }
    if(this.filterAppointment.date != '' && a.date != this.filterAppointment.date.replaceAll('-', ''))
    {
      return false;
    }
    if(this.filterAppointment.time != -1 && a.time/100 != this.filterAppointment.time)
    {
      return false;
    }

    return true;
  }

  showCurrentAppointment(appointment:Appointment)
  {
    this.checkDate = appointment.date;
    this.currentAppointment = appointment;
    this.currentAppointmentDate = parseInt(appointment.date);

    let year = (this.currentAppointmentDate - this.currentAppointmentDate%10000)/10000;
    let month = (this.currentAppointmentDate%10000 - this.currentAppointmentDate%100)/100;
    let day = this.currentAppointmentDate%100;
    if(month < 10)
    {
      this.currentAppointmentDateString = year + '-0' + month + '-'
    }
    else
    {
      this.currentAppointmentDateString = year + '-' + month + '-'
    }
    if(day < 10)
    {
      this.currentAppointmentDateString = this.currentAppointmentDateString + "0" + day;
    }
    else
    {
      this.currentAppointmentDateString = this.currentAppointmentDateString + day;
    }
    this.currentAppointmentDetails = JSON.parse( atob(appointment.details));
    this.getAvailableTime();
  }

  cancelAppointment(appointment:Appointment)
  {
    this.appointmentService.deleteAppointment(appointment.id)
        .subscribe(
            data =>
            {
              if(data == "deleted")
              {
                let newMessage:Message = new Message();
                newMessage.id = new Date().getTime().toString();
                newMessage.fromAccountId = this.user.id;
                newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
                newMessage.toAccountId = appointment.doctorId;
                newMessage.toAccountName = appointment.doctor_name;
                newMessage.type = "message";
                newMessage.title = "[System] #" + this.user.id + " Cancel Appointment"
                newMessage.message = "Date:"+ appointment.date + "\nTime:" + appointment.time/100 + ":00";
                newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
                this.messageService.createMessage( this.user.id, appointment.doctorId, newMessage)
                    .subscribe(data=>
                        {
                          window.location.href = "message/cancelAppointmentSuccessful";
                        }
                        , error =>
                        { window.location.href = "message/cancelAppointmentSuccessfulWithoutSystemMessage";}
                    )
              }
              else
              {
                window.location.href = "message/cancelAppointmentFailed";
              }
            })
  }

  showSendMessageView()
  {
    this.showSendMessage=true;
  }
  showAppointmentView()
  {
    this.showSendMessage=false;
  }

  sendMessage()
  {
    let title   = (document.getElementById("title") as HTMLInputElement).value;
    let message = (document.getElementById("message") as HTMLInputElement).value;
    let newMessage = new Message();
    newMessage.id = new Date().getTime().toString();
    newMessage.message = message;
    newMessage.title   = title;
    newMessage.fromAccountId = this.user.id;
    newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
    newMessage.toAccountId = this.currentAppointment.personId;
    newMessage.toAccountName = this.currentAppointment.person_name;
    newMessage.type = "message";
    newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
    this.messageService.createMessage( this.user.id, this.currentAppointment.doctorId, newMessage)
        .subscribe(data=>
            {
              window.location.href = "message/sendMessageSuccessful";
            }
            , error =>
            { window.location.href = "message/sendMessageFailed";}
        )
  }

  changeDate()
  {
    this.currentAppointmentDateString = (document.getElementById("date") as HTMLInputElement).value;
    this.checkDate = this.currentAppointmentDateString.replaceAll("-", "");
    this.getAvailableTime();
  }

  getAvailableTime()
  {
    this.availableTime = [...this.menus.AVAIBLE_TIME];
    this.appointmentService.getAppointmentsByDoctorIDAndDate(this.currentAppointment.doctorId, parseInt(this.checkDate)).
    subscribe(data=>
    {
      for(let i:number = 0 ; i < this.availableTime.length ; i++)
      {
        for(let j:number=0; j < data.length; j++)
        {
          if(data[j].time == this.availableTime[i])
          {
            this.availableTime.splice(i, 1);
            i--;
          }
        }
      }
    })
  }

  updateAppointment(appointment:Appointment)
  {
    let newAppointmentDetail = new AppointmentDetails();
    newAppointmentDetail.location = (document.getElementById("location") as HTMLSelectElement).value;
    newAppointmentDetail.additional = (document.getElementById("additional") as HTMLTextAreaElement).value;
    newAppointmentDetail.department = this.currentAppointmentDetails.department;
    appointment.date = (document.getElementById("date") as HTMLInputElement).value.replaceAll("-", "");
    appointment.time = parseInt((document.getElementById("time") as HTMLSelectElement).value);
    appointment.details = btoa(JSON.stringify(newAppointmentDetail));
    this.appointmentService.updateAppointment(appointment.id,appointment).subscribe(data=>
    {
      if(data.id > 0)
      {
        let newMessage:Message = new Message();
        newMessage.id = new Date().getTime().toString();
        newMessage.fromAccountId = this.user.id;
        newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
        newMessage.toAccountId = appointment.doctorId;
        newMessage.toAccountName = appointment.doctor_name;
        newMessage.type = "message";
        newMessage.title = "[System] #" + this.user.id + " Reschedule Appointment"
        newMessage.message = "Date:"+ appointment.date + "\nTime:" + appointment.time/100 + ":00\nLocation:" + newAppointmentDetail.location + "\nAdditional:["  + newAppointmentDetail.additional + "]";
        newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
        this.messageService.createMessage( this.user.id, appointment.doctorId, newMessage)
            .subscribe(data=>
                {
                  window.location.href = "message/updateAppointmentSuccessful";
                }
                , error =>
                { window.location.href = "message/updateAppointmentSuccessfulWithoutSystemMessage";}
            )
      }
      else
      {
        window.location.href = "message/updateAppointmentFailed";
      }
    }, error => { window.location.href = "message/updateAppointmentFailed";})
  }
}
