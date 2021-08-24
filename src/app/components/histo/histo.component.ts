import {Collaborator} from 'src/app/model/collaborator';
import {AuthService} from './../../services/auth.service';
import {Subscription} from 'rxjs';
import {HistoService} from './../../services/histo.service';
import {ChartDataSets, ChartType} from 'chart.js';
import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import * as moment from 'moment';
import {map} from "rxjs/operators";
import {DayOff} from "../../model/dayOff";
import {DayOffTypeEnum} from "../../enum/dayoff-type-enum";

interface DayOffMonths {dayOffMonths:DayOff[]}

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
  dayOffMonthsArray: DayOffMonths[] = [];

  constructor(
    private histoService: HistoService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {


    this.user = this.authService.getUserFromLocalCache();


    this.getGraphByYear(moment().year());
  }

  //Fonction qui sert :
  // On veut récupérer les jours posés dans l'année choisi variable : yearChoice
  getGraphByYear(yearChoice: number) {
    //Suivant précédent, stock la variable pour définir en quel année nous sommes
    this.currentYear < yearChoice
      ? (this.currentYear -= 1)
      : (this.currentYear += 1);
    //Recherche de tous les collab avec day off et on boucle dessus pour faire un tri par années
    //This fait ref à l'objet créé en amont
    this.histoService.getAllDayOff().pipe(
      //pipe : filtre qui permet de faire des trucs
      //on fait une boucle sur tous les collabs trouvés
      map((collaborators: Collaborator[]) => collaborators.map((c: Collaborator) => c.daysOffs.filter((d: DayOff) => {
        let splitDateStart = d.startDate.split("/");
        let dateDayOff = moment(splitDateStart[2] + '-' + splitDateStart[1] + '-' + splitDateStart[0]);
        let dateDayOffYear = dateDayOff.format("YYYY");
        let currentDate = parseInt(String(this.currentYear));
        let dateActual = moment(currentDate + '-01-01').subtract(1, 'year').format("YYYY");
        let dateDayOffMonths = dateDayOff.format("MM");
        let tab = [];
        console.log(moment().month(1).format("MMMM"));
        moment.locale("fr");
        console.log(moment.months());
        if (d.type.toString() === DayOffTypeEnum[DayOffTypeEnum.RTTE]) {
          if (dateDayOffMonths == "08") {
            this.dayOffMonthsArray.push(d.type);
          }
          console.log();

        }

        return dateActual === dateDayOffYear;


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

  getMonths() {
    moment.locale("fr");
    let arrayMonths = [];
    console.log(moment.months());
    for (let i = 0; i < moment.months().length; i++) {
      console.log(moment.months()[i]);
      arrayMonths.push(moment.months()[i]);
    }
    return arrayMonths;
  }

  lineChartLabels: Label[] = this.getMonths();


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
