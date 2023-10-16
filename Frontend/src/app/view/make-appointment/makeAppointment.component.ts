import { Component } from '@angular/core';
//import * as $ from 'jquery';
import { Appointment } from 'src/app/model/appointment';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account-service';
import { AppointmentService } from 'src/app/service/appointment-service';
import { AppointmentDetails } from 'src/app/model/appointment-details';
import {Menus} from "../../menus/menus";
import {DoctorDetail} from "../../model/doctor-detail";
interface DepartmentDoctors {
  [key: string]: string[];
}
@Component({
  selector: 'app-appointment',
  templateUrl: './makeAppointment.component.html',
  styleUrls: ['./makeAppointment.component.css']
})

export class MakeAppointmentComponent
{
  state:number = 0;
  menus:Menus = new Menus();
  mouthList:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayList:number[] = [31,28,31,30,31,30,31,31,30,31,30,31];
  year:number = -1;
  mouth:string = "";
  mouthIndex:number = -1;
  days:number[] = [];
  emptyDays:string[] = [];
  date:number = -1;
  currentDate:number = -1;
  user:Account = new Account();
  appointment : Appointment = new Appointment;
  appointmentDetails:AppointmentDetails = new AppointmentDetails();
  doctorList:Account[] = [];
  availableTime:number[] = [900, 1000, 1100, 1300, 1400, 1500, 1600];



  constructor(private accountService : AccountService, private appointmentService : AppointmentService)
  {}

  ngOnInit()
  {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    if( this.user != null && this.user.type == "PERSON" )
    {
      this.appointment.personId = this.user.id;
      this.appointment.person_name = this.user.firstName + " " + this.user.lastName;
    }
    else
    {
      window.location.href = "message/accessForbidden";
    }
  }
  toStep2()
  {
    // @ts-ignore
    document.getElementById("location"  ).removeAttribute('style');
    // @ts-ignore
    document.getElementById("department").removeAttribute('style');
    this.appointment.doctor_name = '';
    this.appointment.doctorId = -1;

    let location   = (document.getElementById("location"  ) as HTMLSelectElement).value;
    let department = (document.getElementById("department") as HTMLSelectElement).value;
    let additional = (document.getElementById("additional") as HTMLTextAreaElement).value;
    if(location == '')
    {
      // @ts-ignore
      document.getElementById("location"  ).style.borderColor = 'red';
    }
    else if(department == '')
    {
      // @ts-ignore
      document.getElementById("department"  ).style.borderColor = 'red';
    }
    else
    {
      console.log(this.appointmentDetails);
      this.accountService.getDoctorsBySubtype(this.appointmentDetails.department).subscribe(data=>{
        this.doctorList = data;
      })
      this.state = 1;
    }
  }

  seeDoctorProfile(doctor:Account)
  {
    window.open('/customer/doctorProfile/' + doctor.id);
  }

  chooseDoctor(doctor:Account)
  {
    this.appointment.doctorId = doctor.id;
    this.appointment.doctor_name = doctor.firstName + " " + doctor.lastName;
    this.appointment.fee = (JSON.parse(atob(doctor.details)) as DoctorDetail).appointmentFee;
    console.log(this.appointment.doctor_name);
  }

  toStep3()
  {
    if(this.appointment.doctorId == -1)
    {
      // @ts-ignore
      document.getElementById("selectDoctorError").innerHTML= "<h6 class='text-bg-danger'>Please Choose A Doctor</h6>";
    }
    else
    {
      this.state = 2;
      this.year = new Date().getFullYear();
      this.mouth = this.mouthList[new Date().getMonth()];
      this.date = new Date().getDate();
      this.mouthIndex = new Date().getMonth() + 1;
      this.mouth = this.mouthList[this.mouthIndex -1];
      this.currentDate = this.year*10000 + this.mouthIndex * 100 + this.date;
      if(this.LeapYear(this.year) && this.mouth == "February")
      {
        this.days = Array(29).fill(1).map((x,i)=> (i+1) );
      }
      else
      {
        this.days = Array(this.dayList[this.mouthIndex-1]).fill(1).map((x,i)=> (i+1) );
      }
      this.emptyDays = Array(7 - (this.date - this.Week() - 1)%7).fill(' ');
      this.getAvailableTime();
    }
  }

  prevMouth()
  {
    if(this.mouthIndex==1)
    {
      this.year = this.year - 1;
      this.mouthIndex = 12;
    }
    else
    {
      this.mouthIndex = this.mouthIndex - 1;
    }
    this.mouth = this.mouthList[this.mouthIndex -1];
    this.currentDate = this.year*10000 + this.mouthIndex * 100 + this.date;
    if(this.LeapYear(this.year) && this.mouth == "February")
    {
      this.days = Array(29).fill(1).map((x,i)=> (i+1) );
    }
    else
    {
      this.days = Array(this.dayList[this.mouthIndex-1]).fill(1).map((x,i)=> (i+1) );
    }
    this.emptyDays = Array(7 - (this.date - this.Week() - 1)%7).fill(' ');
    this.getAvailableTime();
  }
  nextMouth()
  {
    if(this.mouthIndex==12)
    {
      this.year = this.year + 1;
      this.mouthIndex = 1;
    }
    else
    {
      this.mouthIndex = this.mouthIndex + 1;
    }
    this.mouth = this.mouthList[this.mouthIndex -1];
    this.currentDate = this.year*10000 + this.mouthIndex * 100 + this.date;
    if(this.LeapYear(this.year) && this.mouth == "February")
    {
      this.days = Array(29).fill(1).map((x,i)=> (i+1) );
    }
    else
    {
      this.days = Array(this.dayList[this.mouthIndex-1]).fill(1).map((x,i)=> (i+1) );
    }
    this.emptyDays = Array(7 - (this.date - this.Week() - 1)%7).fill(' ');
    this.getAvailableTime();
  }
  setDate(date:number)
  {
    this.date = date;
    this.getAvailableTime();
  }

  getAvailableTime()
  {
    let checkDate = this.year*10000 + this.mouthIndex*100 + this.date;
    this.availableTime = [900, 1000, 1100, 1300, 1400, 1500, 1600];
    this.appointmentService.getAppointmentsByDoctorIDAndDate(this.appointment.doctorId, checkDate).
    subscribe(data=>
    {
      for(let i:number = 0 ; i < this.availableTime.length ; i++)
      {
        for(let j:number=0; j < data.length; j++)
        {
          if(data[j].time == this.availableTime[i])
          {
            console.log(data[j].time)
            this.availableTime.splice(i, 1);
            i--;
          }
        }
      }
    })
  }

  chooseTime(time:number)
  {
    this.appointment.date = String(this.year*10000 + this.mouthIndex*100 + this.date);
    this.appointment.time = time;
  }

  submit()
  {
    this.appointment.details = btoa(JSON.stringify(this.appointmentDetails));

    console.log(this.appointment);
    this.appointmentService.createAppointment(this.appointment)
        .subscribe(
            data =>
            {
              if(data.id > 0)
              {
                window.location.href = "message/makeAppointmentSuccessful";
              }
              else
              {
                window.location.href = "message/makeAppointmentFailed";
              }
            }, error =>
            {
               window.location.href = "message/" + error.response.text;
            })

  }

  LeapYear(year:number)
  {
    if(year%4==0&&year%100!=0||year%400==0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  Week()
  {
    var dayNum = this.date;
    var monthNum = 0;
    var yearNum = 0;
    var week = 0;

    var year = this.year;


    if(this.mouthIndex ==5)
    {
      monthNum = 0;
    }
    else if
    (this.mouthIndex == 8)
    {
      monthNum = 1;
    }
    else if(this.mouthIndex == 2||this.mouthIndex == 3||this.mouthIndex == 11)
    {
      monthNum = 2;
    }
    else if(this.mouthIndex == 6)
    {
      monthNum = 3;
    }
    else if(this.mouthIndex == 9||this.mouthIndex == 12)
    {
      monthNum = 4;
    }
    else if(this.mouthIndex == 4||this.mouthIndex == 7)
    {
      monthNum = 5;
    }
    else if(this.mouthIndex == 1||this.mouthIndex == 10)
    {
      monthNum = 6;
    }

    // @ts-ignore
    yearNum = (parseInt((year%100) / 4 ) + year%100 )%7

    return (dayNum + monthNum +yearNum) % 7;
  }

}

