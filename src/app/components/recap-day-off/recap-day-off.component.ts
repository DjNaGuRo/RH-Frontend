import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recap-day-off',
  templateUrl: './recap-day-off.component.html',
  styleUrls: ['./recap-day-off.component.scss']
})

interface Ligne {
  dayOffType: string;
  pris: number;
  restant: number;
}

export class RecapDayOffComponent implements OnInit {

  let lignes!: Ligne[] = [
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
  constructor() { }

  ngOnInit(): void {
  }


} // fin de la class
