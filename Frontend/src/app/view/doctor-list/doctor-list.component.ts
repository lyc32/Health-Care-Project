import { Component, OnInit } from '@angular/core';
import { Menus } from 'src/app/menus/menus';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account-service';
import {Message} from "../../model/message";
import {MessageService} from "../../service/message-service";
import {DoctorDetail} from "../../model/doctor-detail";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit{

  menus:Menus= new Menus();
  doctorList : Account[] = [];
  currentDoctorList: Account[] = [];
  filterAccount:Account = new Account();
  showSendMessage:boolean = false;
  showEditDoctor:boolean = false;
  currentDoctorId:number = -1;
  currentDoctorDetail:DoctorDetail = new DoctorDetail();
  user:Account = new Account();

  preDeleteId:number = -1;

  constructor(private accountService : AccountService, private messageService:MessageService)
  {
  }
  ngOnInit(): void
  {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    if(this.user != null && this.user.type == "ADMIN")
    {
      this.getAllDoctors();
    }
    else
    {
      window.location.href = "message/accessForbidden";
    }
  }

  private getAllDoctors()
  {
    this.accountService.getDoctors()
        .subscribe(
        data=>
        {
          this.doctorList = data;
          this.currentDoctorList = this.doctorList;
    })
  }

  seeDoctorProfile(doctor:Account)
  {
    window.open('/customer/doctorProfile/' + doctor.id);
  }

  filter()
  {
    this.currentDoctorList = this.doctorList.filter(a => this.compare(a));
  }

  compare(account1:Account)
  {
    if(this.filterAccount.id != -1 && account1.id != this.filterAccount.id)
    {
      return false;
    }
    if(this.filterAccount.firstName != '' && account1.firstName.toUpperCase() != this.filterAccount.firstName.toUpperCase())
    {
      return false;
    }
    if(this.filterAccount.lastName != '' && account1.lastName.toUpperCase() != this.filterAccount.lastName.toUpperCase())
    {
      return false;
    }
    if(this.filterAccount.birthday != '' && account1.birthday != this.filterAccount.birthday)
    {
      return false;
    }
    if(this.filterAccount.gender != '' && account1.gender.toUpperCase() != this.filterAccount.gender.toUpperCase())
    {
      return false;
    }
    if(this.filterAccount.emailId != '' && account1.emailId.toUpperCase() != this.filterAccount.emailId.toUpperCase())
    {
      return false;
    }
    if(this.filterAccount.phone != '' && account1.phone != this.filterAccount.phone)
    {
      return false;
    }
    if(this.filterAccount.subtype != '' && account1.subtype.toUpperCase() != this.filterAccount.subtype.toUpperCase())
    {
      return false;
    }
    return true;
  }

  showDelete(doctorId:number)
  {
    this.preDeleteId = doctorId;
  }

  closeDelete()
  {
    this.preDeleteId = -1;
  }

  delete(id:number)
  {
    this.accountService.deleteAccountById(id)
        .subscribe(
            data =>
            {
              if(data == "deleted")
              {
                window.location.href = "message/deleteDoctorSuccessful";
              }
              else
              {
                window.location.href = "message/deleteDoctorFailed";
              }
            })
  }

  adminCreateDoctor()
  {
    window.location.href = "admin/create/doctor";
  }

  showEditDoctorView(doctor:Account)
  {
    this.currentDoctorId = doctor.id;
    this.currentDoctorDetail = JSON.parse(atob(doctor.details));;
    this.showEditDoctor = true;
  }

  closeEditDoctorView()
  {
    this.currentDoctorId = -1;
    this.showEditDoctor = false;
  }

  updateAppointmentFee()
  {
    console.log(this.currentDoctorId);
    let appointmentFee = (document.getElementById(this.currentDoctorId + 'appointmentFee') as HTMLInputElement).value;

    let newDoctorDetail = new DoctorDetail();
    if (appointmentFee == '')
    {
      // @ts-ignore
      document.getElementById(this.currentDoctorId + "errorMessage").innerHTML = '<div class="alert alert-danger">Appointment Fee Is Empty</div>';
    }
    else
    {
      newDoctorDetail.appointmentFee = Number(appointmentFee);
      newDoctorDetail.introduce = this.currentDoctorDetail.introduce;
      newDoctorDetail.workExperiences = this.currentDoctorDetail.workExperiences;

      this.accountService.updateDetails(this.currentDoctorId, btoa(JSON.stringify(newDoctorDetail))).subscribe(
          (data)=>
          {
            window.location.href = "message/updateDoctorSuccessful";
          },
          error =>
          {
            window.location.href = "message/updateDoctorFailed";
          }
      );
    }
  }

  updateDepartment()
  {
    let department = (document.getElementById(this.currentDoctorId + 'department') as HTMLSelectElement).value;
    this.accountService.updateSubtype(this.currentDoctorId, department).subscribe(
        (data)=>
        {
          window.location.href = "message/updateDoctorSuccessful";
        },
        error =>
        {
          window.location.href = "message/updateDoctorFailed";
        }
    );
  }

  resetPassword()
  {
    let password = (document.getElementById(this.currentDoctorId + "password") as HTMLInputElement).value;
    let confirm = (document.getElementById(this.currentDoctorId + "confirm") as HTMLInputElement).value;
    if (password == '')
    {
      // @ts-ignore
      document.getElementById(this.currentDoctorId + "errorMessage").innerHTML = '<div class="alert alert-danger"> Password Is Empty</div>';
    }
    else if(password != confirm)
    {
      // @ts-ignore
      document.getElementById(this.currentDoctorId + "errorMessage").innerHTML = '<div class="alert alert-danger">PassWord and Confirm Password not Match</div>';
    }
    else
    {
      this.accountService.resetPassword(this.currentDoctorId, password).subscribe(
          (data)=>
          {
            window.location.href = "message/updateDoctorSuccessful";
          },
          error =>
          {
            window.location.href = "message/updateDoctorFailed";
          }
      );
    }
  }



  showSendMessageView(id:number)
  {
    this.currentDoctorId = id;
    this.showSendMessage=true;
  }
  closeSendMessageView()
  {
    this.showSendMessage=false;
    this.currentDoctorId = -1;
  }

  sendMessage(doctor:Account)
  {
    let title   = (document.getElementById(doctor.id + "title") as HTMLInputElement).value;
    let message = (document.getElementById(doctor.id + "message") as HTMLInputElement).value;
    let newMessage = new Message();
    newMessage.id = new Date().getTime().toString();
    newMessage.message = message;
    newMessage.title   = title;
    newMessage.fromAccountId = this.user.id;
    newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
    newMessage.toAccountId = doctor.id;
    newMessage.toAccountName = doctor.firstName+' ' + doctor.lastName;
    newMessage.type = "message";
    newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
    this.messageService.createMessage( this.user.id, doctor.id, newMessage)
        .subscribe(data=>
            {
              window.location.href = "message/sendMessageSuccessful";
            }
            , error =>
            { window.location.href = "message/sendMessageFailed";}
        )
  }


}
