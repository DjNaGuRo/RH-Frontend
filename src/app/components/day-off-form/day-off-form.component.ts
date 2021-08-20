import { Component, OnInit } from '@angular/core';
import { DaysOff } from '../../model/daysOff';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

imports: [NgbModule]

@Component({
  selector: 'day-off-form',
  templateUrl: './day-off-form.component.html'
})

export class DayOffFormComponent {
  closeResult = '';
  minEndDate!: NgbDateStruct;
  dayOffForm!: FormGroup;

  current = new Date();
  minDate: NgbDateStruct = {
    year: this.current.getFullYear(), month:
      this.current.getMonth() + 1, day: this.current.getDate() + 1
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder, private config: NgbDatepickerConfig) {

    console.log(this.dayOffForm);
    config.outsideDays = 'hidden';
  }


  ngOnInit(): void {
    this.dayOffForm = this.fb.group(
      {
        'dayOffType': ['', [Validators.required]],
        'startDate': ['', [Validators.required]],
        'endDate': ['', [Validators.required]]
      }, {
      updateOn: 'blur',
    });
    this.dayOffForm.get('startDate')?.valueChanges.subscribe(startDate => this.minEndDate = startDate);

  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  resetDayOffForm() {
    this.dayOffForm.reset();
  }
  // test appel fonction avec le bouton submit
  verifForm() {
    console.log("La vérification se lance : ");
    console.log(this.dayOffForm.get('startDate')?.value);
    console.log(this.dayOffForm.get('endDate')?.value);
    console.log(this.dayOffForm.get('dayOffType')?.value);
    this.resetDayOffForm();
  }
}