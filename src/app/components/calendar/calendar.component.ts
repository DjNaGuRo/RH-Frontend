import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  daysOffMonth?:string[]
  constructor() { }

  ngOnInit(): void {
    this.getDaysArrayByMonth()
    console.log( this.daysOffMonth);
    
  }
  
   getDaysArrayByMonth() {
     var daysInMonth = moment([2021, 1]).daysInMonth();
     var arrDays = [];
     
     while(daysInMonth) {
       var current = moment().date(daysInMonth);
       arrDays.push(current);
       daysInMonth--;
      }
    let daysOffMonthFormat:string[] = []
    arrDays.forEach(function(item) {
      daysOffMonthFormat.push(item.format("DD/MM"));
    })
    daysOffMonthFormat.reverse()
    this.daysOffMonth = daysOffMonthFormat
    
  }
}
