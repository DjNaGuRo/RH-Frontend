import { Subscription } from 'rxjs';
import { HistoService } from './../../services/histo.service';
import { ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.scss'],
})
export class HistoComponent implements OnInit {
  currentMonth!: number;
  currentMonthLetter!: string;
  currentYear = moment().year();
  daysOffYear?: string[];
  collaborators:any =[];

  constructor(private histoService: HistoService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.histoService.getAllDayOff().subscribe((v) => console.log(v));
    this.getGraphByYear(moment().year());
    this.histoService
      .getAllDayOff()
      .subscribe((collaborators) => (this.collaborators = collaborators));
  }
  getGraphByYear(yearChoice: number) {
    return this.currentYear < yearChoice
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
