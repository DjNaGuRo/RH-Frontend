import { DayOffTypeEnum } from 'src/app/enum/dayoff-type-enum';
import { Collaborator } from './../../model/collaborator';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DayOff } from 'src/app/model/dayOff';
import * as moment from 'moment';
import { CollaboratorRoleEnum } from 'src/app/enum/collaborator-role-enum';

interface Ligne {
  dayOffType: string;
  restant: number;
}
interface Day {
  date: Date;
}

@Component({
  selector: 'app-recap-day-off',
  templateUrl: './recap-day-off.component.html',
  styleUrls: ['./recap-day-off.component.scss']
})

export class RecapDayOffComponent implements OnInit {
  collaborator?: Collaborator;
  totalRTTE?= 5
  totalRTTS?= 6
  totalCP?= 25
  totalCSS?: number

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.collaborator = this.authService.getUserFromLocalCache();
    this.calculateDaysOff()
  }

  calculateDaysOff() {
    for (const day of this.collaborator!.daysOffs) {
      let startDateString = day.startDate
      let momentVariableStart = moment(startDateString, 'DD/MM/YYYY');
      let stringvalue = momentVariableStart.format('YYYY-MM-DD');
      // let dateStartDate = new Date(stringvalue);
      let endDateString = day.endDate
      let momentVariableEnd = moment(endDateString, 'DD/MM/YYYY');
      let stringvalue2 = momentVariableEnd.format('YYYY-MM-DD');
      // let dateEndDate = new Date(stringvalue2);
      // let daysCount = momentVariableEnd.diff(momentVariableStart, 'days')+1;
      let workingDays = this.calculateBusinessDays(momentVariableStart, momentVariableEnd);


      switch (day.type) {
        case DayOffTypeEnum.CP:
          this.totalCP! -= workingDays
          break;
        case DayOffTypeEnum.RTTE:
          this.totalRTTE! -= workingDays
          break;
        case DayOffTypeEnum.RTTS:
          this.totalRTTS! -= workingDays
          break;
        case DayOffTypeEnum.CSS:
          this.totalCSS! += workingDays
          break;
      }
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
    return workingDays;
  }


  public get CollaboratorRoleEnum() {
    return CollaboratorRoleEnum;
  }



} // fin de la class
