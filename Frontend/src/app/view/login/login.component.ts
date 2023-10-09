import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account-service';
import {Account} from "../../model/account";
import {MessageService} from "../../service/message-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  user:Account = new Account();

  constructor(private accountService:AccountService, private messageService:MessageService)
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('healthCenterUser') );
    if(this.user != null)
    {
      window.location.href = "message/accessForbidden";
    }
  }
  login()
  {
    let email   = (document.getElementById('email') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    if(email == '')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '<div class="alert alert-danger">E-mail is Empty</div>';
    }
    else if(password == '')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '<div class="alert alert-danger">Password is Empty</div>';
    }
    else
    {
      this.accountService.login(email, password).subscribe(
        data =>
        {
          if(data.id > 0)
          {
            window.sessionStorage.setItem("healthCenterUser", JSON.stringify(data));
            this.messageService.getMyReceiveMessage(data.id).subscribe(data => {window.sessionStorage.setItem("healthCenterUserMessage", JSON.stringify(data))})
            window.location.href = "message/logInSuccessful";
          }
          else
          {
            window.location.href = "message/logInFailed";
          }
        },
        error =>
        {
          window.location.href = "message/logInFailed";
        });
    }

  }
}
