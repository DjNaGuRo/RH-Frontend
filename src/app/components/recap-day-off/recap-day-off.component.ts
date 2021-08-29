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
    for (const day of this.daysOff) {
      let startDateString = day.startDate
      let momentVariableStart = moment(startDateString, 'DD/MM/YYYY');
      let stringvalue = momentVariableStart.format('YYYY-MM-DD');
      let dateStartDate = new Date(stringvalue);
      let endDateString = day.startDate
      let momentVariableEnd = moment(endDateString, 'DD/MM/YYYY');
      let stringvalue2 = momentVariableEnd.format('YYYY-MM-DD');
      let dateEndDate = new Date(stringvalue2);


    }
    console.log ("recherche de daysOffs : ");
  console.log(this.collaborator?.daysOffs);
    })

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
