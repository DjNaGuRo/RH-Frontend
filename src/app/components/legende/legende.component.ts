import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-legende',
  templateUrl: './legende.component.html',
  styleUrls: ['./legende.component.scss']
})
export class LegendeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  html = `<div>
             <ul class="puce">
              <li> RTTE : Réduction du temps de travail employé</li>
              <li> RTTS : Réduction du temps de travail salarié</li>
              <li> CP : Congés payés</li>
              <li> F : Fériés</li>
              <li> CSS : Congés sans solde</li>
            </ul>

            <ul class="puce">
              <div class='box INITIAL'></div>
              <li> Demande initiale</li>

              <div class='box WAITING_FOR_VALIDATION'></div>
              <li> En attente de validation</li>

              <div class='box VALIDATED'></div>
              <li> Demande validée</li>

              <div class='box REJECTED'></div>
              <li> Demande rejetée</li>

            </ul>
         </div>`;

}
