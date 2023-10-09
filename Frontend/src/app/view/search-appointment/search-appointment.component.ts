import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../service/appointment-service";
import {Account} from "../../model/account";
import {Appointment} from "../../model/appointment";
import {AppointmentDetails} from "../../model/appointment-details";
import {Message} from "../../model/message";
import {MessageService} from "../../service/message-service";
import {Menus} from "../../menus/menus";

@Component({
  selector: 'app-search-appointment',
  templateUrl: './search-appointment.component.html',
  styleUrls: ['./search-appointment.component.css']
})
export class SearchAppointmentComponent implements OnInit
{

  user:Account = new Account();
  currentAppointmentList: Appointment[] = [];
  currentAppointment:Appointment = new Appointment();
  currentAppointmentDetails:AppointmentDetails = new AppointmentDetails()
  currentAppointmentDate:number = -1;
  currentDate:number = -1;

  showSendMessage:boolean = false;

  menus:Menus = new Menus();

  ngOnInit()
  {
    this.router.snapshot.params['role'];
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    this.currentDate = new Date().getFullYear()*10000 + (new Date().getMonth()+1)*100 + new Date().getDate();
    if(this.user == null)
    {
      window.location.href = "message/accessForbidden";
    }
  }

  constructor(private router:ActivatedRoute, private appointmentService:AppointmentService, private messageService:MessageService)
  {
  }

  search()
  {
    let doctorName = (document.getElementById("doctorName"    ) as HTMLInputElement).value;
    let personName = (document.getElementById("personName"    ) as HTMLInputElement).value;
    let date       = (document.getElementById("date"          ) as HTMLInputElement).value;
    let time:any   = (document.getElementById("time"          ) as HTMLInputElement).value;
    let fee:any    = (document.getElementById("appointmentFee") as HTMLInputElement).value;

    date = date.toString().replaceAll('-', '')


    let doctorId = -1;
    if(this.user.type == "DOCTOR")
    {
      doctorId = this.user.id;
    }

    if(time != '')
    {
      let tmp = parseInt(time.toString().replaceAll(':', ''));
      time = tmp - tmp%100;
    }
    else
    {
      time = -1;
    }

    if(fee == "")
    {
      fee = -1
    }

    this.appointmentService.search(doctorId, doctorName, personName, date, time, Number(fee))
      .subscribe(
        (data)=>
        {
          this.currentAppointmentList = data;
          console.log(this.currentAppointmentList)
        });
  }

  showCurrentAppointment(appointment:Appointment)
  {
    this.currentAppointment = appointment;
    this.currentAppointmentDetails = JSON.parse( atob(appointment.details));
    this.currentAppointmentDate = parseInt(this.currentAppointment.date);
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
    this.messageService.createMessage( this.user.id, this.currentAppointment.personId, newMessage)
        .subscribe(data=>
        {
          window.location.href = "message/sendMessageSuccessful";
        }
        , error =>
            { window.location.href = "message/sendMessageFailed";}
        )
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
                newMessage.toAccountId = appointment.personId;
                newMessage.toAccountName = appointment.person_name;
                newMessage.type = "message";
                newMessage.title = "[System] Doctor #" + this.user.id + " Cancel Appointment"
                newMessage.message = "Date:"+ appointment.date + "\nTime:" + appointment.time/100 + ":00";
                this.messageService.createMessage( this.user.id, appointment.personId, newMessage)
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

  updateAppointment(appointment:Appointment)
  {
    let newAppointmentDetail = new AppointmentDetails();
    newAppointmentDetail.location = (document.getElementById("location") as HTMLSelectElement).value;
    newAppointmentDetail.additional = (document.getElementById("additional") as HTMLTextAreaElement).value;
    newAppointmentDetail.department = this.currentAppointmentDetails.department;
    appointment.date = (document.getElementById("date") as HTMLInputElement).value.replaceAll("-", "");
    appointment.time = parseInt((document.getElementById("time") as HTMLSelectElement).value);
    appointment.details = btoa(JSON.stringify(newAppointmentDetail));
    console.log(JSON.stringify(newAppointmentDetail));
    console.log(btoa(JSON.stringify(newAppointmentDetail)));
    console.log(appointment.details);

    this.appointmentService.updateAppointment(appointment.id,appointment).subscribe(data=>
    {
      if(data.id > 0)
      {
        let newMessage:Message = new Message();
        newMessage.id = new Date().getTime().toString();
        newMessage.fromAccountId = this.user.id;
        newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
        newMessage.toAccountId = appointment.personId;
        newMessage.toAccountName = appointment.person_name;
        newMessage.type = "message";
        newMessage.title = "[System] #" + this.user.id + " Reschedule Appointment"
        newMessage.message = "Date:"+ appointment.date + "\nTime:" + appointment.time/100 + ":00\nLocation:" + newAppointmentDetail.location + "\nAdditional:["  + newAppointmentDetail.additional + "]";
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
