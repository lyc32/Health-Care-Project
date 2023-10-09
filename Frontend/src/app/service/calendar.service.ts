import { Injectable, OnInit } from '@angular/core';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class CalendarService{
  private choosenDay: number = 0;
  private choosenTime : number = 0;
  private choosenMonth: number = 0;
  private choosenYear: number = 0;
  private choosenDate: string = '';
  private currentUser : Account = new Account;
  private status : string = 'no';
  disabledTime: number[] = [900,1400];
  constructor() { }
  setChooseDay(day: number) {
    this.choosenDay = day;
  }
  getChooseDay() {
    return this.choosenDay;
  }
  setChoosenTime(time : number)
  {
    this.choosenTime = time;
  }
  getChoosenTime()
  {
    return this.choosenTime
  }
  setchoosenMonth(month : number)
  {
    this.choosenMonth = month;
  }
  getChoosenMonth()
  {
    return this.choosenMonth;
  }
  setchoosenYear(year : number)
  {
    this.choosenYear = year;
  }
  getChoosenYear()
  {
    return this.choosenYear;
  }
  isDisabledTime(time : number)
  {
    return this.disabledTime.includes(time);
  }
  getCurrentUser()
  {
    let tmp = window.sessionStorage.getItem('healthCenterUser');
    if(tmp != null)
    {
      this.currentUser = JSON.parse(tmp);
    }
    else
    {
      this.currentUser = new Account();
    }
    return this.currentUser;
  }
  getChoosenDate()
  {
    this.choosenDate = this.choosenMonth.toString() + '/' + this.choosenDay.toString() + '/' + this.choosenYear.toString();
    return this.choosenDate;
  }
  setStatus(status : string)
  {
    this.status = status;
  }
  getStatus()
  {
    return this.status;
  }
}
