import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth!:number;
  currentYear = moment().year()
  daysOffMonth?:string[]
  constructor() { }

  ngOnInit(): void {
    this.getDaysArrayByMonth(moment().month())
  }

   getDaysArrayByMonth(monthChoice:number) {

     if (monthChoice < 0 ) {
       monthChoice = 11
       this.currentYear -= 1
     }
     if (monthChoice > 11 ) {
      monthChoice = 0
      this.currentYear += 1
    }
     var daysInMonth = moment([this.currentYear, monthChoice]).daysInMonth();
     var arrDays = [];

     while(daysInMonth) {
       var current = moment([this.currentYear, monthChoice]).date(daysInMonth);
       arrDays.push(current);
       daysInMonth--;
      }
    let daysOffMonthFormat:string[] = []
    let currentMonth:number
    currentMonth = parseInt(arrDays[0].format("MM"))

    arrDays.forEach(function(item) {
      daysOffMonthFormat.push(item.locale("fr").format("dd \n DD/MM"));
    })
    this.currentMonth = currentMonth
    daysOffMonthFormat.reverse()
    this.daysOffMonth = daysOffMonthFormat

  }
}
