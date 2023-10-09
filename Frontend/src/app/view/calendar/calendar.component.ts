import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService : CalendarService){}
  private currentMonth: number = 0;
  private currentYear: number = 0;
  daysInMonth: number[] = [];
  disabledDays: number[] = [1, 7, 15];
  
  ngOnInit(): void {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.generateCalendar();
  }
  
  generateCalendar(): void {
    const date = new Date(this.currentYear, this.currentMonth + 1, 0);
    const numberOfDays = date.getDate();
    this.calendarService.setchoosenMonth(this.currentMonth);
    this.calendarService.setchoosenYear(this.currentYear);
    this.daysInMonth = Array.from({ length: numberOfDays }, (_, i) => i + 1);
  }
  
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
  
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }
  getCurrentMonth()
  {
    return this.currentMonth;
  }
  getCurrentYear()
  {
    return this.currentYear;
  }
}
