import { Component, OnInit } from '@angular/core';
import { Menus } from 'src/app/menus/menus';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account-service';
import { CalendarService } from 'src/app/service/calendar.service';

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

  preDeleteId:number = -1;

  constructor(private accountService : AccountService)
  {
  }
  ngOnInit(): void
  {
    this.getAllDoctors();
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

}
