import { Component } from '@angular/core';
import {Account} from "../../model/account";
import {AccountService} from "../../service/account-service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent
{
  user:Account = new Account();

  constructor(private accountService:AccountService)
  {
      // @ts-ignore
      this.user = JSON.parse( window.sessionStorage.getItem('healthCenterUser') );
      if(this.user != null)
      {
          window.location.href = "message/accessForbidden";
      }
      else
      {
          this.user = new Account();
      }
  }

  signIn()
  {
    let first_name = (document.getElementById("firstName") as HTMLInputElement).value;
    let last_name  = (document.getElementById("lastName") as HTMLInputElement).value;
    let phone      = (document.getElementById("phone") as HTMLInputElement).value;
    let email      = (document.getElementById("email") as HTMLInputElement).value;
    let password   = (document.getElementById("password") as HTMLInputElement).value;
    let confirm    = (document.getElementById("confirm") as HTMLInputElement).value;
    if(first_name == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">First Name Is Empty</div>';
    }
    else if(last_name == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Last Name Is Empty</div>';
    }
    else if(phone == '')
    {
        // @ts-ignore
        document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Phone Number Is Empty</div>';
    }
    else if(email == '')
    {
        // @ts-ignore
        document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">E-mail Id Is Empty</div>';
    }
    else if(password == '')
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">Password Is Empty</div>';
    }
    else if(password != confirm)
    {
      // @ts-ignore
      document.getElementById("errorMessage").innerHTML = '<div class="alert alert-danger">PassWord and Confirm Password not Match</div>';
    }
    else
    {
        this.user.firstName = first_name;
        this.user.lastName = last_name;
        this.user.emailId = email;
        this.user.password = password;
        this.user.phone = phone;

        this.accountService.signPerson(this.user)
          .subscribe(
              data =>
              {
                  if( data.id > 0)
                  {
                      window.location.href = "message/signInSuccessful";
                  }
                  else
                  {
                      window.location.href = "message/signInFailed";
                  }
              },
              error =>
              {
                  window.location.href = "message/signInFailed";
              });
    }
  }

  reset()
  {

  }

}
