import {Component, OnInit} from '@angular/core';
import { Account } from 'src/app/model/account';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../service/account-service";
import {DoctorDetail} from "../../model/doctor-detail";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit
{
  doctor:Account = new Account();
  doctorDetail: DoctorDetail = new DoctorDetail();

  constructor(private router:ActivatedRoute, private accountService:AccountService)
  {
  }

  ngOnInit():void
  {
    this.doctor.id = this.router.snapshot.params['id'];
    this.accountService.getAccountById(this.doctor.id)
        .subscribe(
            data=>{
              this.doctor = data;
              this.doctorDetail = JSON.parse(atob(this.doctor.details));
            });

    //(document.getElementById("introduce") as HTMLTextAreaElement).innerHTML = this.doctorDetail.introduce;

  }

  ngDoCheck()
  {
    const textArea = (document.getElementById("introduce") as HTMLTextAreaElement);
    textArea.style.height = textArea.scrollHeight + 'px';
  }

}
