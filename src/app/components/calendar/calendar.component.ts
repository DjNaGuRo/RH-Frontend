import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Collaborator } from 'src/app/model/collaborator';
import { DayOff } from 'src/app/model/dayOff';
import { UserService } from 'src/app/services/user.service';

// Création d'une interface qui va permettre d'afficher le tableau des jours de congé de chaque employé
interface CollaboratorCalendar extends Collaborator {
  daysOffMonth: (DayOff | null)[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Mois actuellement visionner qui va permettre de lancer les fonctions permettant de changer le mois affiché
  currentMonth!: number;
  // Mois actuellement visionner affiché dans l'entête du calendrier
  currentMonthLetter!: string;
  // Année actuellement visionner affiché dans l'entête du calendrier
  currentYear = moment().year();
  // Liste de tout les jours du mois actuellement visionner
  daysOffMonth?: string[];
  // Liste des collaborators du département d'un Manager
  collaborators?: Collaborator[];
  // Initialisation du calendrier permettant l'affichage des jours de congés de chaques employés
  collaboratorsCalendar: CollaboratorCalendar[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Récupération des collaborators du département d'un Manager et lancement de la fonction permettant d'initialiser le calendrier
    this.userService.getCollaborator().subscribe((collaborators) => {
      this.collaborators = collaborators;
      console.log(this.collaborators);

      this.getDaysArrayByMonth(moment().month());
    });
  }
  // Fonction permettant d'afficher les jours d'un mois donné et traitement de l'affichage des jours de congés de chaque collaborator
  getDaysArrayByMonth(monthChoice: number) {
    this.collaboratorsCalendar = [];
    if (monthChoice < 0) {
      monthChoice = 11;
      this.currentYear -= 1;
    }
    if (monthChoice > 11) {
      monthChoice = 0;
      this.currentYear += 1;
    }
    var daysInMonth = moment([this.currentYear, monthChoice]).daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment([this.currentYear, monthChoice]).date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    arrDays.reverse();
    let daysOffMonthFormat: string[] = [];
    let currentMonth: number;
    currentMonth = parseInt(arrDays[0].format('MM'));
    this.currentMonthLetter = arrDays[0].locale('fr').format('MMMM');

    if (this.collaborators) {
      // Nous rajoutons à l'interface CollaboratorCalendar chaque collaborator du departement avec un tableau vide de jour de congés
      for (const collaborator of this.collaborators) {
        const collabCalendar: CollaboratorCalendar = {
          ...collaborator,
          daysOffMonth: [],
        };
        // Pour chaque jours du mois si il correspond a un jour de congé d'un collaborator alors nous le rajoutons à sa liste, sinon nous rajoutons une entrée null
        for (const day of arrDays) {
          let dayOffFind = false;
          for (const dayOff of collaborator.daysOffs) {
            if (dayOff.startDate === day.locale('fr').format('DD/MM/YYYY')) {
              collabCalendar.daysOffMonth.push(dayOff);
              dayOffFind = true;
            }
          }
          if (!dayOffFind) {
            collabCalendar.daysOffMonth.push(null);
          }
        }
        this.collaboratorsCalendar.push(collabCalendar);
      }
      // Formatage de chaque jours du mois pour l'affichage des jours dans le calendrier
      for (const day of arrDays) {
        daysOffMonthFormat.push(day.locale('fr').format('dd \n DD/MM'));
      }
    }

    this.currentMonth = currentMonth;
    daysOffMonthFormat;
    this.daysOffMonth = daysOffMonthFormat;
  }
}
