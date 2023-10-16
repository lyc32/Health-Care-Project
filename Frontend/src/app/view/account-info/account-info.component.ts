import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/model/account';
import {WorkExperience} from "../../model/work-experience";
import {DoctorDetail} from "../../model/doctor-detail";
import {AccountService} from "../../service/account-service";
import {PersonDetail} from "../../model/person-detail";
import {Message} from "../../model/message";
import {MessageService} from "../../service/message-service";

@Component({
  selector: 'app-doctor-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit
{

  role:string = "doctor";
  type:string = "info";
  user:Account = new Account();


  showAddExperienceForm = false;
  showSendMessageList = false;
  sendMessageList:Message[] = new Array();
  receiveMessageList:Message[] = new Array();

  showReply = false;

  age:number = -1;
  tmpPhoto:string = '';
  doctorAppointmentFee = 0;
  doctorIntroduce:string = '';
  doctorWorkExperiencesList: WorkExperience[] = [];
  customerDetails:PersonDetail[]=[];

  constructor(private router:ActivatedRoute, private accountService:AccountService, private messageService:MessageService)
  {
  }

  ngOnInit():void
  {
    this.role = this.router.snapshot.params['role'];
    this.type = this.router.snapshot.params['type'];
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    this.tmpPhoto = this.user.photo;
    this.age = new Date().getFullYear() - new Date(this.user.birthday).getFullYear();
    if(this.user != null)
    {
      if(this.user.type == "DOCTOR")
      {
        this.doctorAppointmentFee = (JSON.parse(atob(this.user.details)) as DoctorDetail).appointmentFee;
        this.doctorIntroduce = (JSON.parse(atob(this.user.details)) as DoctorDetail).introduce;
        this.doctorWorkExperiencesList = (JSON.parse(atob(this.user.details)) as DoctorDetail).workExperiences;
      }
      if(this.user.type == "PERSON")
      {
        this.customerDetails = (JSON.parse(atob(this.user.details)) as PersonDetail[])
      }

      if(this.type == 'message')
      {
        this.showReceiveMassageList()
      }
    }
    else
    {
      window.location.href = "message/accessForbidden";
    }
  }

  onchangePhoto()
  {
    this.tmpPhoto = (document.getElementById("photo") as HTMLInputElement).value;
  }
  updatePhoto()
  {
    let id = this.user.id;
    let photo = (document.getElementById("photo") as HTMLInputElement).value;
    let gender = (document.getElementById("gender") as HTMLSelectElement).value;
    let birthday = (document.getElementById("birthday") as HTMLInputElement).value;
    if (photo == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Photo Link Is Empty</div>';
    }
    else if (gender == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Please Choose Your Gender</div>';
    }
    else if (birthday == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Please Choose Your Birthday</div>';
    }
    else
    {
      this.accountService.updatePhoto(id, photo, gender, birthday).subscribe(
          (data)=>
          {
            window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
            window.location.href = "message/updateSuccessful";
          },
          error =>
          {
            console.log(error)
            window.location.href = "message/updateFailed";
          }
      );
    }

  }

  updatePhoneNumber()
  {
    let id = this.user.id;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    if (phone == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Phone Number Is Empty</div>';
    }
    else if(phone == this.user.phone)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Please Enter A New Number</div>';
    }
    else
    {
      this.accountService.updatePhone(id, phone).subscribe(
        (data)=>
        {
          window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
          window.location.href = "message/updateSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateFailed";
        }
      );
    }
  }

  updateEmail()
  {
    let id = this.user.id;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    if (email == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">E-mail Is Empty</div>';
    }
    else if(email == this.user.phone)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Please Enter A New E-mail</div>';
    }
    else
    {
      this.accountService.updateEmail(id, email).subscribe(
        (data)=>
        {
          window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
          window.location.href = "message/updateSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateFailed";
        }
      );
    }
  }

  resetPassword()
  {
    let id = this.user.id;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let confirm = (document.getElementById("confirm") as HTMLInputElement).value;
    let oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
    if (password == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger"> Password Is Empty</div>';
    }
    else if(password == this.user.password)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Please Enter A New Password</div>';
    }
    else if(oldPassword != this.user.password)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">You Original PassWord Is Incorrect</div>';
    }
    else if(password != confirm)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">PassWord and Confirm Password not Match</div>';
    }
    else
    {
      this.accountService.resetPassword(id, password).subscribe(
        (data)=>
        {
          window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
          window.location.href = "message/updateSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateFailed";
        }
      );
    }
  }

  updateAppointmentFee()
  {
    let newDoctorDetail = new DoctorDetail();
    let id = this.user.id;
    let appointmentFee = (document.getElementById("appointmentFee") as HTMLInputElement).value;
    if (appointmentFee == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Appointment Fee Is Empty</div>';
    }
    else
    {
      newDoctorDetail.appointmentFee = Number(appointmentFee);
      newDoctorDetail.introduce = this.doctorIntroduce;
      newDoctorDetail.workExperiences = this.doctorWorkExperiencesList;

      this.accountService.updateDetails(id, btoa(JSON.stringify(newDoctorDetail))).subscribe(
        (data)=>
        {
          window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
          window.location.href = "message/updateSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateFailed";
        }
      );
    }
  }

  updateWorkExperience()
  {
    let newDoctorDetail = new DoctorDetail();
    let id = this.user.id;
    let introduce = (document.getElementById("introduce") as HTMLTextAreaElement).value;
    if (introduce == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Resume Is Empty</div>';
    }
    else
    {
      newDoctorDetail.appointmentFee = this.doctorAppointmentFee;
      newDoctorDetail.introduce = introduce;
      newDoctorDetail.workExperiences = this.doctorWorkExperiencesList;
      this.accountService.updateDetails(id, btoa(JSON.stringify(newDoctorDetail))).subscribe(
        (data)=>
        {
          window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
          window.location.href = "message/updateSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateFailed";
        }
      );
    }
  }

  showAddExperienceFrom()
  {
    // @ts-ignore
    document.getElementById("showAddExperienceButton").style.visibility = 'hidden';
    this.showAddExperienceForm=true;
  }

  addExperience()
  {
    let startDate = (document.getElementById("startDate") as HTMLInputElement).value;
    let endDate = (document.getElementById("endDate") as HTMLInputElement).value;
    let description = (document.getElementById("description") as HTMLTextAreaElement).value;
    let workExperience = new WorkExperience();
    workExperience.startDate = startDate;
    workExperience.endDate = endDate;
    workExperience.description = description;
    this.doctorWorkExperiencesList.push(workExperience);
    // @ts-ignore
    document.getElementById("showAddExperienceButton").style.visibility = 'visible';
    this.showAddExperienceForm=false;
  }

  deleteExperience(workExperience: WorkExperience)
  {
    for(let i = 0; i < this.doctorWorkExperiencesList.length; i++)
    {
      if (( this.doctorWorkExperiencesList[i].startDate == workExperience.startDate) && (this.doctorWorkExperiencesList[i].endDate == workExperience.endDate)&& (this.doctorWorkExperiencesList[i].description == workExperience.description))
      {
        this.doctorWorkExperiencesList.splice(i, 1);
      }
    }
  }

  showSendMassageList()
  {
    this.showSendMessageList = true;
    this.messageService.getMySendMessage(this.user.id)
        .subscribe(
        data =>
        {
          this.sendMessageList = data;
        })
  }

  showReceiveMassageList()
  {
    this.showSendMessageList = false;
    this.messageService.getMyReceiveMessage(this.user.id)
        .subscribe(
            data =>
            {
              this.receiveMessageList = data;
              console.log(data);
            })
  }

  showReplyView()
  {
    this.showReply = !this.showReply;
  }

  deleteMessage(message:Message)
  {
   if(this.showSendMessageList == true)
   {
     console.log(message);
     this.messageService.deleteSendMessage(this.user.id, message.id)
         .subscribe(
             data => {
               this.sendMessageList = data;
               console.log(data);
             });
   }
   else
   {
     for(let i:number = 0 ; i < this.receiveMessageList.length ; i++)
     {
       this.messageService.deleteReceiveMessage(this.user.id, message.id).subscribe(data => {this.receiveMessageList = data});

     }
   }
  }

  sendMessage(m:Message)
  {
    let title   = "Re: " + m.title;
    let message = (document.getElementById(m.id + '_replyMessage') as HTMLInputElement).value;
    let newMessage = new Message();
    newMessage.id = new Date().getTime().toString();
    newMessage.message = message;
    newMessage.title   = title;
    newMessage.fromAccountId = this.user.id;
    newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
    newMessage.toAccountId = m.fromAccountId;
    newMessage.toAccountName = m.fromAccountName;
    newMessage.type = "message";
    newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
    this.messageService.createMessage( this.user.id, m.fromAccountId, newMessage)
        .subscribe(data=>
            {
              window.location.href = "message/sendMessageSuccessful";
            }
            , error =>
            { window.location.href = "message/sendMessageFailed";}
        )

  }

}
