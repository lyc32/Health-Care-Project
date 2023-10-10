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
  msgNumber:number = 0;

  constructor(private doctorService:AccountService)
  {
    if(window.sessionStorage.getItem('healthCenterUser') != null)
    {
      // @ts-ignore
      this.user    = JSON.parse( window.sessionStorage.getItem('healthCenterUser') );
      // @ts-ignore
      this.msgNumber = JSON.parse( window.sessionStorage.getItem('healthCenterUserMessage') ).length;
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
    window.sessionStorage.removeItem('healthCenterUser');
    window.location.href = "message/logOutSuccessful";
  }

}
