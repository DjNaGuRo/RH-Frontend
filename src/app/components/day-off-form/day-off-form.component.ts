import { Component } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DayOffToCreate } from 'src/app/model/dayOff';
import { DayOffService } from 'src/app/services/day-off.service';
import * as moment from 'moment';
import { EnumType } from 'typescript';
import { DayOffTypeEnum } from 'src/app/enum/dayoff-type-enum';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'day-off-form',
  templateUrl: './day-off-form.component.html',
  styleUrls: ['./day-off-form.component.scss']
})

export class DayOffFormComponent {
  closeResult = '';
  minEndDate!: NgbDateStruct;
  maxStartDate!: NgbDateStruct;
  dayOffForm!: FormGroup;
  selectedValue = "CP";

  current = new Date();
  minDate: NgbDateStruct = {
    year: this.current.getFullYear(), month:
      this.current.getMonth() + 1, day: this.current.getDate() + 1
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder,
     private config: NgbDatepickerConfig, private dayOffService: DayOffService,
     private notifierService: NotifierService) {
    config.outsideDays = 'hidden';
  }


  ngOnInit(): void {
    this.dayOffForm = this.fb.group(
      {
        'dayOffType': ['', [Validators.required]],
        'startDate': ['', [Validators.required]],
        'endDate': ['', [Validators.required]],
        'reason': ['', [Validators.required, Validators.minLength(4)]],
      }, {
      updateOn: 'blur'
    });
    this.dayOffForm.get('startDate')?.valueChanges.subscribe(startDate => this.minEndDate = startDate);
    this.dayOffForm.get('endDate')?.valueChanges.subscribe(endDate => this.maxStartDate = endDate);
  }

  get DayOffTypeIsValid() {
    return (
      this.dayOffForm.get('dayOffType')?.valid
    )
  }
  get DayOffTypeIsInvalid() {
    return (
      this.dayOffForm.get('dayOffType')?.invalid
    )
  }
  get StartDateIsValid() {
    return (
      this.dayOffForm.get('startDate')?.valid
    )
  }
  get StartDateIsInvalid() {
    return (
      this.dayOffForm.get('startDate')?.invalid
    )
  }
  get reasonIsInvalid() {
    return (
      this.dayOffForm.get('reason')?.invalid &&
      this.dayOffForm.get('reason')?.dirty
    )
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  resetDayOffForm() {
    this.dayOffForm.reset();
  }

  sendForm($event: any) {
    $event.preventDefault();
    if (this.dayOffForm.invalid) {
      return;
    }
    let dayOffToCreate = this.formateDayOff();
    this.dayOffService.createDayOff(dayOffToCreate)
      .subscribe(
        () => {
          this.modalService.dismissAll();
          this.notifierService.notify(NotificationType.SUCCESS, "Votre demande a été prise en compte");
        },
      (error : HttpErrorResponse)=>this.notifierService.notify(NotificationType.ERROR, error.error.text));
    this.resetDayOffForm();
  }

  formateDayOff (): DayOffToCreate {
    let dayOffTypeToCreate: DayOffTypeEnum = this.dayOffForm.get('dayOffType')?.value;
    console.log(dayOffTypeToCreate);

    let startDateFormValue = this.dayOffForm.get('startDate')?.value;
    let startDateFormat = new Date(startDateFormValue.year, startDateFormValue.month - 1, startDateFormValue.day);
    let startDateToCreate = moment(startDateFormat).format('DD/MM/YYYY');

    let endDateFormValue = this.dayOffForm.get('endDate')?.value;
    let endDateFormat = new Date(endDateFormValue.year, endDateFormValue.month - 1, endDateFormValue.day);
    let endDateToCreate = moment(endDateFormat).format('DD/MM/YYYY');

    let dayOffReasonToCreate: string = this.dayOffForm.get('reason')?.value;

    let dayOffToCreate: DayOffToCreate = {
      type: dayOffTypeToCreate,
      startDate: startDateToCreate,
      endDate: endDateToCreate,
      reason: dayOffReasonToCreate
    }
    return dayOffToCreate;
  }
}
