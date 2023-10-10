import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {Appointment} from "../../model/appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../service/appointment-service";
import { AccountService } from 'src/app/service/account-service';
import {Message} from "../../model/message";

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

  showDeleteView:boolean = false;
  showResetView :boolean = false;

  ngOnInit()
  {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
    if(this.user == null || (this.user as Account).type != 'ADMIN')
    {
      window.location.href = "message/accessForbidden";
    }
  }

  constructor(private router:ActivatedRoute, private accountService:AccountService)
  {
  }

  search()
  {
    let id       = (document.getElementById("id") as HTMLInputElement).value;
    let firstName= (document.getElementById("firstName") as HTMLInputElement).value;
    let lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    let emailId  = (document.getElementById("emailId") as HTMLInputElement).value;
    let phone    = (document.getElementById("phone") as HTMLInputElement).value;
    let birthday = (document.getElementById("birthday") as HTMLInputElement).value;
    let gender   = (document.getElementById("gender") as HTMLInputElement).value;

    let numberId = -1
    if( id !=='')
    {
      numberId=Number(id);
    }

    this.accountService.search(numberId, firstName, lastName, emailId, phone, birthday, gender)
      .subscribe(
        (data) =>
        {
          console.log(data);
          this.currentAccountList = data;
        });
  }

   showAccountView(account:Account)
   {
     this.currentAccount = account;
     this.showResetView  = false;
     this.showDeleteView = false;
   }

   deleteView()
   {
     this.showDeleteView = true;
   }

   closeDeleteView()
   {
     this.showDeleteView = false;
   }

   deleteAccount(id:number)
   {
       this.accountService.deleteAccountById(id)
           .subscribe(
               data =>
               {
                   if(data == "deleted")
                   {
                       window.location.href = "message/deleteAccountSuccessful";
                   }
                   else
                   {
                       window.location.href = "message/deleteAccountFailed";
                   }
               })
   }

   resetView()
   {
       this.showResetView = true;
   }

   closeResetView()
   {
       this.showResetView = false;
   }

   resetPassword()
   {
       let id = this.currentAccount.id;
       let password = (document.getElementById("password") as HTMLInputElement).value;
       let confirm = (document.getElementById("confirm") as HTMLInputElement).value;
       if (password == '')
       {
           // @ts-ignore
           document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger"> Password Is Empty</div>';
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
                   if(data.id > 0)
                   {
                       window.location.href = "message/adminResetUserPasswordSuccessful";
                   }
                   else
                   {
                       window.location.href = "message/adminResetUserPasswordFailed";
                   }
               },
               error =>
               {
                   window.location.href = "message/adminResetUserPasswordFailed";
               }
           );
       }
   }


}
