import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {Appointment} from "../../model/appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../service/appointment-service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit
{
  user:Account = new Account();
  currentAccountList: Account[] = [];
  currentAccount:Account = new Account();

  ngOnInit()
  {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    if(this.user == null || (this.user as Account).type != 'ADMIN')
    {
      window.location.href = "message/accessForbidden";
    }
  }

  constructor(private router:ActivatedRoute, private appointmentService:AppointmentService)
  {
  }

  search() {
    let id       = (document.getElementById("id") as HTMLInputElement).value;
    let firstName= (document.getElementById("firstName") as HTMLInputElement).value;
    let lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    let emailId  = (document.getElementById("emailId") as HTMLInputElement).value;
    let phone    = (document.getElementById("phone") as HTMLInputElement).value;
    let birthday = (document.getElementById("birthday") as HTMLInputElement).value;
    let age      = (document.getElementById("age") as HTMLInputElement).value;
    let gender   = (document.getElementById("gender") as HTMLInputElement).value;

    /*this.appointmentService.search(doctorId, doctorName, personName, date, time, Number(fee))
      .subscribe(
        (data) => {
          this.currentAccountList = data;
        });*/
  }
}
