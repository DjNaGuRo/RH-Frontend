import {Collaborator} from 'src/app/model/collaborator';
import {AuthService} from './../../services/auth.service';
import {Subscription} from 'rxjs';
import {HistoService} from './../../services/histo.service';
import {ChartDataSets, ChartType} from 'chart.js';
import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import * as moment from 'moment';
import {CollaboratorRoleEnum} from "../../enum/collaborator-role-enum";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {filter, map, tap} from "rxjs/operators";
import {DayOff} from "../../model/dayOff";

@Component({
  selector: 'app-histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.scss'],
})
export class HistoComponent implements OnInit {
  currentYear = moment().year();
  daysOffYear?: string[];
  collaborators: any = [];
  subscriptions: Subscription[] = [];
  user?: Collaborator;

  constructor(
    private histoService: HistoService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.user = this.authService.getUserFromLocalCache();


    this.getGraphByYear(moment().year());
  }

  getGraphByYear(yearChoice: number) {
    this.currentYear < yearChoice
      ? (this.currentYear -= 1)
      : (this.currentYear += 1);
    this.histoService.getAllDayOff().pipe(
      map((collaborators: Collaborator[]) => collaborators.map((c: Collaborator) => c.daysOffs.filter((d:DayOff) =>{
        let splitDateStart = d.startDate.split("/");
        let dateDayOff = moment(splitDateStart[2]+'-'+splitDateStart[1]+'-'+splitDateStart[0]).locale("fr").format("YYYY");
        let currentDate = parseInt(String(this.currentYear));
        let dateActual = moment(currentDate+'-01-01').format("YYYY");
        return dateDayOff == dateActual;
      })))
    ).subscribe(result => console.log(result));
    /*this.histoService.getAllDayOff().subscribe((collab) => {
      this.collaborators = collab;
      collab.map((collaborator)=>{
        collaborator.daysOffs.map((dayOffs)=> console.log(dayOffs.startDate)).filter((date)=>console.log(date))
      })
    });*/

  }

  lineChartData: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75], label: 'RTT'},
    {data: [25, 45, 46, 79, 95, 58], label: 'CP'},
  ];

  lineChartLabels: Label[] = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
}
