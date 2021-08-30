import { DayOffStatusEnum } from './../../enum/dayoff-status-enum';
import { CollaboratorRoleEnum } from './../../enum/collaborator-role-enum';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Collaborator } from 'src/app/model/collaborator';
import { DayOff, DayOffToCreate } from 'src/app/model/dayOff';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DayOffTypeEnum } from 'src/app/enum/dayoff-type-enum';
import { DayOffService } from 'src/app/services/day-off.service';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { DayOffFormComponent } from '../day-off-form/day-off-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { FormBuilderDayoff } from '../../model/form-builder-dayoff';

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
  isDown = false;
  startX: any;
  scrollLeft: any;
  @ViewChild('slider') slider!: ElementRef;
  // Mois actuellement visionner qui va permettre de lancer les fonctions permettant de changer le mois affiché
  currentMonth = moment().month();
  // Mois actuellement visionner affiché dans l'entête du calendrier
  currentMonthLetter!: string;
  // Année actuellement visionner affiché dans l'entête du calendrier
  currentYear = moment().year();
  // Liste de tout les jours du mois actuellement visionner
  daysOffMonth?: string[];
  // Liste des collaborators du département d'un Manager
  collaborators?: Collaborator[];
  collaborator?: Collaborator;
  // Initialisation du calendrier permettant l'affichage des jours de congés de chaques employés
  collaboratorsCalendar: CollaboratorCalendar[] = [];

  dayOffForm?: FormGroup;
  subject = new Subject<DayOff>();
  fromParent!: DayOff;

  setDayOff(value: DayOff) {
    let splitDateStart = value.startDate.split('/');
    let dateDayOffStart = moment(
      splitDateStart[2] + '-' + splitDateStart[1] + '-' + splitDateStart[0]
    );
    let splitDateEnd = value.startDate.split('/');
    let dateDayOffEnd = moment(
      splitDateEnd[2] + '-' + splitDateEnd[1] + '-' + splitDateEnd[0]
    );
    this.dayOffForm = new FormGroup({
      dayoff: FormBuilderDayoff.getDayoff({
        type: value.type,
        startDate: moment(dateDayOffStart).format('YYYY-MM-DD'),
        endDate: moment(dateDayOffEnd).format('YYYY-MM-DD'),
        reason: value.reason,
      }),
    });
    return this.dayOffForm;
  }

  openModal(dayOff: DayOff) {
    let splitDateStart = dayOff.startDate.split('/');
    let dateDayOffStart = moment(
      splitDateStart[2] + '-' + splitDateStart[1] + '-' + splitDateStart[0]
    );
    let splitDateEnd = dayOff.startDate.split('/');
    let dateDayOffEnd = moment(
      splitDateEnd[2] + '-' + splitDateEnd[1] + '-' + splitDateEnd[0]
    );
    this.setDayOff(dayOff);
    let data = {
      type: dayOff.type,
      startDate: moment(dateDayOffStart).format('YYYY-MM-DD'),
      endDate: moment(dateDayOffEnd).format('YYYY-MM-DD'),
      reason: dayOff.reason,
    };
    const modal: NgbModalRef = this.modalService.open(DayOffFormComponent, {
      backdrop: 'static',
    });
    const modalComponent: DayOffFormComponent = modal.componentInstance;
    modalComponent.fromParent = data;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dayOffService: DayOffService,
    private notifierService: NotifierService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Récupération des collaborators du département d'un Manager et lancement de la fonction permettant d'initialiser le calendrier
    this.userService.getCollaborator().subscribe((collaborator) => {
      this.collaborator = collaborator;
      if (this.collaborator?.role === CollaboratorRoleEnum.MANAGER) {
        this.userService.getCollaborators().subscribe((collaborators) => {
          this.collaborators = collaborators;
          this.getDaysArrayByMonth(this.currentMonth);
        });
      } else {
        this.getDaysArrayByMonth(this.currentMonth);
      }
    });
  }

  private sendErrorNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(
        notificationType,
        'Une erreur est survenue. svp recommencer !'
      );
    }
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
    let currentMonthLetter = arrDays[0].locale('fr').format('MMMM');
    this.currentMonthLetter =
      currentMonthLetter.charAt(0).toUpperCase() +
      currentMonthLetter.substring(1);
    this.findDayOff(arrDays);
  }

  findDayOff(arrDays: moment.Moment[]) {
    let daysOffMonthFormat: string[] = [];
    this.currentMonth = parseInt(arrDays[0].format('MM'));

    for (const day of arrDays) {
      daysOffMonthFormat.push(day.locale('fr').format('dd \n DD/MM'));
    }
    // Formatage de chaque jours du mois pour l'affichage des jours dans le calendrier
    if (this.collaborators) {
      this.daysOffForDepartment(arrDays);
    } else {
      this.daysOffForCollaborator(arrDays);
    }
    this.daysOffMonth = daysOffMonthFormat;
  }

  daysOffForDepartment(arrDays: moment.Moment[]) {
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
            if (this.checkDayOff(day, dayOff)) {
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
    }
  }

  daysOffForCollaborator(arrDays: moment.Moment[]) {
    if (this.collaborator) {
      const collabCalendar: CollaboratorCalendar = {
        ...this.collaborator,
        daysOffMonth: [],
      };
      for (const day of arrDays) {
        let dayOffFind = false;
        for (const dayOff of this.collaborator.daysOffs) {
          if (this.checkDayOff(day, dayOff)) {
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
  }

  checkDayOff(day: moment.Moment, dayOff: DayOff): boolean {
    let dayEndSplit = parseInt(dayOff.endDate.split('/', 1)[0]);
    let dayStartSplit = parseInt(dayOff.startDate.split('/', 1)[0]);
    let dayOffStartMonth = parseInt(dayOff.startDate.split('/', 2)[1]);
    let dayOffStartYear = parseInt(dayOff.startDate.split('/', 3)[2]);
    let dayOffEndMonth = parseInt(dayOff.endDate.split('/', 2)[1]);
    let dayOffEndYear = parseInt(dayOff.endDate.split('/', 3)[2]);

    let dateStart = moment([
      dayOffStartYear,
      dayOffStartMonth - 1,
      dayStartSplit,
    ]);
    let dateEnd = moment([dayOffEndYear, dayOffEndMonth - 1, dayEndSplit]);
    if (
      day.locale('fr').format('dd') === 'sa' ||
      day.locale('fr').format('dd') === 'di'
    ) {
      return false;
    } else if (day.isBetween(dateStart, dateEnd, 'days', '[]')) {
      return true;
    }
    return false;
  }

  public get DayOffStatusEnum() {
    return DayOffStatusEnum;
  }

  public get DayOffTypeEnum() {
    return DayOffTypeEnum;
  }

  public get CollaboratorRoleEnum() {
    return CollaboratorRoleEnum;
  }

  acceptDayOff(dayOff: DayOff): void {
    let dayOffToChange = this.setDayOffToChange(
      dayOff,
      DayOffStatusEnum.VALIDATED
    );
    this.dayOffService.createDayOff(dayOffToChange).subscribe(
      (response) => {
        this.notifierService.notify(
          NotificationType.SUCCESS,
          "Cette demande d'absence a été validé"
        );
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.sendErrorNotification(NotificationType.ERROR, error.error.text);
      }
    );
  }

  refuseDayOff(dayOff: DayOff): void {
    let dayOffToChange = this.setDayOffToChange(
      dayOff,
      DayOffStatusEnum.REJECTED
    );
    this.dayOffService.createDayOff(dayOffToChange).subscribe(
      (response) => {
        this.notifierService.notify(
          NotificationType.SUCCESS,
          "Cette demande d'absence a été refusé"
        );
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.sendErrorNotification(NotificationType.ERROR, error.error.text);
      }
    );
  }

  setDayOffToChange(dayOff: DayOff, status: DayOffStatusEnum): DayOff {
    let dayOffToChange: DayOff = {
      id: dayOff.id,
      requestDate: dayOff.requestDate,
      startDate: dayOff.startDate,
      endDate: dayOff.endDate,
      type: dayOff.type,
      reason: dayOff.reason,
      status: status,
      collaborators: dayOff.collaborators,
    };
    return dayOffToChange;
  }

  deleteDayOff(dayOff: DayOff): void {
    this.dayOffService.deleteDayOff(dayOff).subscribe(
      (response) => {
        this.notifierService.notify(
          NotificationType.SUCCESS,
          'Votre jour de congé a été supprimé'
        );
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.sendErrorNotification(NotificationType.ERROR, error.error.text);
      }
    );
  }
  dayOffOwner(dayOff: DayOff): boolean {
    for (const collabDayOff of this.collaborator!.daysOffs) {
      if (collabDayOff.id === dayOff.id) {
        console.log('owner');

        return true;
      }
    }
    return false;
  }
  mousedown(e: MouseEvent) {
    this.isDown = true;
    this.slider.nativeElement.classList.add('active');
    this.startX = e.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }
  mouseleave(e: MouseEvent) {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }
  mouseup(e: MouseEvent) {
    this.isDown = false;
    this.slider.nativeElement.classList.remove('active');
  }
  mousemove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 3; //scroll-fast
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
