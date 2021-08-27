import {Collaborator} from 'src/app/model/collaborator';
import {AuthService} from './../../services/auth.service';
import {Subscription} from 'rxjs';
import {HistoService} from './../../services/histo.service';
import {ChartDataSets, ChartType} from 'chart.js';
import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import * as moment from 'moment';
import {DayOffTypeEnum} from '../../enum/dayoff-type-enum';
import { DayOff } from 'src/app/model/dayOff';

interface DayOffMonths {
  type: DayOffTypeEnum;
  dayOffs: DayOff[];
}

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
  lineChartData: ChartDataSets[] = [];
  lineChartColors: Color[] = [];
  isFinished = false;

  constructor(
    private histoService: HistoService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
    this.getGraphByYear(moment().year());
    this.isFinished = false;
  }

  //Fonction qui sert :
  // On veut récupérer les jours posés dans l'année choisi variable : yearChoice
  getGraphByYear(yearChoice: number) {
    this.lineChartData = [];
    this.isFinished = true;
    //Suivant précédent, stock la variable pour définir en quel année nous sommes
    this.currentYear < yearChoice
      ? (this.currentYear -= 1)
      : (this.currentYear += 1);

    //define date actual pas with button "prev/next"
    let currentDate = parseInt(String(this.currentYear));
    let dateActual = moment(currentDate + '-01-01').subtract(1, 'year').format('YYYY');

    //define array of type DaysOff
    const types = [DayOffTypeEnum.CP, DayOffTypeEnum.RTTE, DayOffTypeEnum.RTTS, DayOffTypeEnum.CSS, DayOffTypeEnum.F];

    //init object lineDataChart
    for (const t of types) {
      this.lineChartData.push({data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: t});
    }

    //get all collab with dayOff
    this.histoService.getAllDayOff()
      .subscribe(collaborators => {

        //deefine color for graph
        this.lineChartColors = [
          {
            borderColor: '#7385C7',
            backgroundColor: '#9B97C4',
          }, {
            borderColor: '#293F94',
            backgroundColor: '#AAB6FA',
          }, {
            borderColor: '#AAE5FA',
            backgroundColor: '#D6E5F7',
          }, {
            borderColor: '#FBA16C',
            backgroundColor: '#F8CC9A',
          }, {
            borderColor: '#C78673',
            backgroundColor: '#C4A897',
          }
        ];

        for (const c of collaborators) {

          for (const d of c.daysOffs) {
            // get date in database and transform in year
            let splitDateStart = d.startDate.split('/');
            let dateDayOff = moment(splitDateStart[2] + '-' + splitDateStart[1] + '-' + splitDateStart[0]);
            let dateDayOffYear = dateDayOff.format('YYYY');


            if (dateActual === dateDayOffYear) {

              // find type if same label increment graph line
              const chartSet = this.lineChartData.find(l => l.label === d.type);
              if (chartSet?.data) {
                if (chartSet.data[dateDayOff.month()] != undefined) {
                  const nb = <number>chartSet.data[dateDayOff.month()];
                  chartSet.data[dateDayOff.month()] = nb + 1;
                }
              }
            }
          }
        }
        this.isFinished = false;
      });
  }

  /**
   * get all month in year
   */
  getMonths() {
    moment.locale('fr');
    let arrayMonths = [];

    for (let i = 0; i < moment.months().length; i++) {

      arrayMonths.push(moment.months()[i]);
    }
    return arrayMonths;
  }

  lineChartLabels: Label[] = this.getMonths();


  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}, backgroundColor: 'pink'}]
    }
  };


  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
}
