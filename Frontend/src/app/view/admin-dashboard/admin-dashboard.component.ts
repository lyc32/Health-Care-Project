import {Component, OnInit} from '@angular/core';
import {Account} from "../../model/account";
import {Appointment} from "../../model/appointment";
import {AppointmentDetails} from "../../model/appointment-details";
import {PersonDetail} from "../../model/person-detail";
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../service/appointment-service";
import {AccountService} from "../../service/account-service";
import Chart from 'chart.js/auto';
import {Message} from "../../model/message";
import {MessageService} from "../../service/message-service";
import {Menus} from "../../menus/menus";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit
{
    public barChart: any;

    public pieChart: any;

    mouthList:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dayList:number[] = [31,28,31,30,31,30,31,31,30,31,30,31];
    year:number = -1;
    mouth:string = "";
    mouthIndex:number = -1;
    days:number[] = [];
    emptyDays:string[] = [];
    date:number = -1;
    currentDate:number = -1;
    currentSecords:number = -1
    currentMinutes:number = -1;
    currentHours:number = -1;
    currentTime: Date = new Date();
    user:Account = new Account();
    onlineDoctors:Account[] = new Array();

    menus:Menus = new Menus();

    appointmentList:number[] = new Array(7);
    timeList:string[] = new Array(7);
    pieChartData:number[] = new Array(this.menus.DOCTOR_TYPE.length).fill(0);

    currentDoctorId:number = -1;
    showSendMessage:boolean = false;

    async ngOnInit()
    {
        // @ts-ignore
        this.user = JSON.parse(window.sessionStorage.getItem('healthCenterUser'));
        if(this.user != null && this.user.type == "ADMIN")
        {
            this.year = new Date().getFullYear();
            this.mouth = this.mouthList[new Date().getMonth()];
            this.date = new Date().getDate();
            this.mouthIndex = new Date().getMonth() + 1;
            this.mouth = this.mouthList[this.mouthIndex -1];
            if(this.LeapYear(this.year) && this.mouth == "February")
            {
                this.days = Array(29).fill(1).map((x,i)=> (i+1) );
            }
            else
            {
                this.days = Array(this.dayList[this.mouthIndex-1]).fill(1).map((x,i)=> (i+1) );
            }
            this.emptyDays = Array(7 - (this.date - this.Week() - 1)%7).fill(' ');
            this.currentDate = new Date().getFullYear()*10000 + (new Date().getMonth()+1)*100 + new Date().getDate();

            await this.getData();
            //this.createPieCart();

            setInterval
            (() => {
                this.setSecondPointerPosition();
            }, 1000);
        }
        else
        {
            window.location.href = "message/accessForbidden";
        }
    }

     constructor(private router:ActivatedRoute, private appointmentService:AppointmentService, private accountService:AccountService, private messageService:MessageService)
    {

    }


    setSecondPointerPosition()
    {
        let dom:any = document.querySelector('.second-pointer');
        const newSecords = new Date().getSeconds();
        if (newSecords != this.currentSecords)
        {
            this.currentSecords = newSecords
            dom.style.transform = `translate(-50%, -100%) rotate(${360 * this.currentSecords / 60}deg)`;
            this.setMinutePointerPosition();
        }
    }

    setMinutePointerPosition()
    {
        let dom:any = document.querySelector('.minute-pointer');
        const newMinutes = new Date().getMinutes();
        if (newMinutes != this.currentMinutes)
        {
            this.currentMinutes = newMinutes;
            dom.style.transform = `translate(-50%, -100%) rotate(${360 * this.currentMinutes / 60}deg)`;
            this.setHourPointerPosition();
            this.getOnlineDoctorList();
        }
    }

    setHourPointerPosition()
    {
        let dom:any = document.querySelector('.hour-pointer');
        const newHours = new Date().getHours();
        if (newHours != this.currentHours)
        {
            this.currentHours = newHours;
            dom.style.transform = `translate(-50%, -100%) rotate(${(360 * newHours / 12)+(30*this.currentMinutes/60)}deg)`
        }
    }

    LeapYear(year:number)
    {
        if(year%4==0&&year%100!=0||year%400==0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    Week()
    {
        var dayNum = this.date;
        var monthNum = 0;
        var yearNum = 0;
        var week = 0;

        var year = this.year;


        if(this.mouthIndex ==5)
        {
            monthNum = 0;
        }
        else if
        (this.mouthIndex == 8)
        {
            monthNum = 1;
        }
        else if(this.mouthIndex == 2||this.mouthIndex == 3||this.mouthIndex == 11)
        {
            monthNum = 2;
        }
        else if(this.mouthIndex == 6)
        {
            monthNum = 3;
        }
        else if(this.mouthIndex == 9||this.mouthIndex == 12)
        {
            monthNum = 4;
        }
        else if(this.mouthIndex == 4||this.mouthIndex == 7)
        {
            monthNum = 5;
        }
        else if(this.mouthIndex == 1||this.mouthIndex == 10)
        {
            monthNum = 6;
        }

        // @ts-ignore
        yearNum = (parseInt((year%100) / 4 ) + year%100 )%7

        return (dayNum + monthNum +yearNum) % 7;
    }

    getOnlineDoctorList()
    {
        this.accountService.getOnlineDoctors().subscribe(data =>{
            this.onlineDoctors = data;
        });
    }

    showMessageView(id:number)
    {
        this.showSendMessage = !this.showSendMessage;
        if(this.showSendMessage == true)
        {
            this.currentDoctorId = id;
        }
        else
        {
            this.currentDoctorId = -1;
        }
    }

    sendMessage(doctor:Account)
    {
        let title   = (document.getElementById(doctor.id + "title") as HTMLInputElement).value;
        let message = (document.getElementById(doctor.id + "message") as HTMLInputElement).value;
        let newMessage = new Message();
        newMessage.id = new Date().getTime().toString();
        newMessage.message = message;
        newMessage.title   = title;
        newMessage.fromAccountId = this.user.id;
        newMessage.fromAccountName = this.user.firstName + " " + this.user.lastName;
        newMessage.toAccountId = doctor.id;
        newMessage.toAccountName = doctor.firstName+' ' + doctor.lastName;
        newMessage.type = "message";
        newMessage.time = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes();
        this.messageService.createMessage( this.user.id, doctor.id, newMessage)
            .subscribe(data=>
                {
                    window.location.href = "message/sendMessageSuccessful";
                }
                , error =>
                { window.location.href = "message/sendMessageFailed";}
            )
    }


    getData()
    {
        for(let i=0; i<7; i++)
        {
            let tmpDay = new Date();
            tmpDay.setDate(tmpDay.getDate() - i);
            let tmpDayNumber =  tmpDay.getFullYear()*10000 + (tmpDay.getMonth()+1)*100 + tmpDay.getDate();
            this.timeList[6-i] = tmpDay.getFullYear() + "-" + (tmpDay.getMonth()+1) + "-"+ tmpDay.getDate()
            this.appointmentService.getAllAppointmentsByDate(tmpDayNumber.toString())
                .subscribe(
                    data=>{
                        this.appointmentList[6-i] = data.length;
                        if(i==6)
                        {
                            this.createBarChart(this.timeList, this.appointmentList);
                        }
                    })
        }

        this.appointmentService.getAllAppointmentsByDate(this.currentDate.toString())
            .subscribe(
                data=>
                {
                    for(let i=0; i<data.length; i++)
                    {
                       let subtype =  JSON.parse(atob(data[i].details)).department;
                       for(let j=0; j<this.menus.DOCTOR_TYPE.length; j++)
                       {
                           if(subtype == this.menus.DOCTOR_TYPE[j] )
                           {
                               this.pieChartData[j]++;
                               break;
                           }
                       }
                    }
                    this.createPieCart(this.menus.DOCTOR_TYPE, this.pieChartData);
                })

    }

    createBarChart(timeList:string[], data:number[])
    {
        // @ts-ignore
        this.barChart = new Chart("barChart",
            {
                data: {
                    datasets: [{
                        type: 'bar',
                        data: data,
                        backgroundColor: [      // 设置每个柱形图的背景颜色
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ]
                    }, {
                        type: 'line',
                        data: data,
                    }],
                    labels: timeList
                },
                options:
                    {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins:{
                            legend: {
                                display: false
                            }
                        }
                    }
            }
            );
    }

    createPieCart(label:string[], data:number[])
    {
        this.pieChart = new Chart("pieChart",
            {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)',
                            'rgba(75, 99, 64, 0.2)'
                        ]
                    }],
                    labels: label
                },

                options: {
                    aspectRatio: 2,
                    plugins:{
                        legend: {
                            display: true,
                            position:"right",

                        }
                    }
                }
            }
        );
    }

}
