import {Collaborator} from 'src/app/model/collaborator';
import {AuthService} from './../../services/auth.service';
import {Subscription} from 'rxjs';
import {HistoService} from './../../services/histo.service';
import {ChartDataSets, ChartType} from 'chart.js';
import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import * as moment from 'moment';
import {CollaboratorRoleEnum} from "../../enum/collaborator-role-enum";

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
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getUserFromLocalCache();
    if (this.user.role !== CollaboratorRoleEnum.MANAGER){
      return;
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.histoService.getAllDayOffByIdUser(this.user.id).subscribe((collab) => {
      console.log(collab);
      this.collaborators = collab;
    });
    this.getGraphByYear(moment().year());
  }
  getGraphByYear(yearChoice: number) {
    console.log(this.user);

    this.currentYear < yearChoice
      ? (this.currentYear -= 1)
      : (this.currentYear += 1);
  }
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'RTT' },
    { data: [25, 45, 46, 79, 95, 58], label: 'CP' },
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
