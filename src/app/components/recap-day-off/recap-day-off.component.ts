import { Collaborator } from './../../model/collaborator';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DayOff } from 'src/app/model/dayOff';
import * as moment from 'moment';

interface Ligne {
  dayOffType: string;
  pris: number;
  restant: number;
}
interface Day{
  date: Date;
}

@Component({
  selector: 'app-recap-day-off',
  templateUrl: './recap-day-off.component.html',
  styleUrls: ['./recap-day-off.component.scss']
})

export class RecapDayOffComponent implements OnInit {
  collaborator?: Collaborator;
  daysOff? : DayOff[];
  listeRTTE? :DayOff[];
  nbRTTE?: Day[];
  listeRTTS? :DayOff[];
  nbRTTS?: Day[];
  listeCSS? :DayOff[];
  nbCSS?: Day[];
  listeCP? :DayOff[];

  constructor(private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getCollaborator().subscribe(collaborator => {
    this.collaborator = collaborator;
    this.daysOff = collaborator.daysOffs;
    // let total days
   
    console.log ("recherche de daysOffs : ");
  console.log(this.collaborator?.daysOffs);
    })

}

calculateDaysOff (daysOff: DayOff[]){
for (const day of daysOff) {
  let startDateString = day.startDate
  let momentVariableStart = moment(startDateString, 'DD/MM/YYYY');
  let stringvalue = momentVariableStart.format('YYYY-MM-DD');
  // let dateStartDate = new Date(stringvalue);
  let endDateString = day.endDate
  let momentVariableEnd = moment(endDateString, 'DD/MM/YYYY');
  let stringvalue2 = momentVariableEnd.format('YYYY-MM-DD');
  // let dateEndDate = new Date(stringvalue2);
  // let daysCount = momentVariableEnd.diff(momentVariableStart, 'days')+1;
  let workingDays =  this.calculateBusinessDays(momentVariableStart, momentVariableEnd);
}
}

calculateBusinessDays(d1: moment.Moment, d2: moment.Moment) {
  const days = d2.diff(d1, "days") + 1;
  let newDay: any = d1.toDate(),
  workingDays: number = 0,
  sundays: number = 0,
  saturdays: number = 0;
  for (let i = 0; i < days; i++) {
      const day = newDay.getDay();
      newDay = d1.add(1, "days").toDate();
      const isWeekend = ((day % 6) === 0);
      if (!isWeekend) {
          workingDays++;
      } 
      else {
          if (day === 6) saturdays++;
          if (day === 0) sundays++;
      }
  }
      console.log("Total Days:", days, "workingDays", workingDays, "saturdays", saturdays, "sundays", sundays);
  return workingDays;
}


  lignes: Ligne[] = [
    {
      dayOffType: 'RTTE',
      pris: 5,
      restant: 12
    },
    {
      dayOffType: 'RTTE',
      pris: 5,
      restant: 12
    }
  ];


} // fin de la class
