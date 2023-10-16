import { Component } from '@angular/core';
import { Account } from './model/account';
import { AccountService } from './service/account-service';
import {Message} from "./model/message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health-Care-Center';
  user:Account = new Account();

  constructor(private accountService:AccountService)
  {
    if(window.sessionStorage.getItem('healthCenterUser') != null)
    {
      // @ts-ignore
      this.user    = JSON.parse( window.sessionStorage.getItem('healthCenterUser') );
      if(this.user.type != "PERSON")
      {
        this.title = this.user.type.toLowerCase();
      }
    }
    else
    {
      this.user = new Account();
    }
  }
  logOut()
  {
    this.accountService.logout(this.user.emailId, this.user.password).subscribe(
        data=>
        {
          if(data == 'success')
          {
            window.sessionStorage.removeItem('healthCenterUser');
            window.location.href = "message/logOutSuccessful";
          }
        }
    )
  }

}
