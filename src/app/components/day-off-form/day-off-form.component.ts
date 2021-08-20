import { Component } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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
  selectedValue ="CP";

  current = new Date();
  minDate: NgbDateStruct = {
    year: this.current.getFullYear(), month:
      this.current.getMonth() + 1, day: this.current.getDate() + 1
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder, private config: NgbDatepickerConfig) {
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

  get DayOffTypeIsValid(){
    return(
      this.dayOffForm.get('dayOffType')?.valid
    )
  }
  get DayOffTypeIsInvalid(){
    return(
      this.dayOffForm.get('dayOffType')?.invalid
    )
  }
  get StartDateIsValid(){
    return(
      this.dayOffForm.get('startDate')?.valid
    )
  }
  get StartDateIsInvalid(){
    return(
      this.dayOffForm.get('startDate')?.invalid
    )
  }
  get reasonIsInvalid(){
    return(
      this.dayOffForm.get('reason')?.invalid &&
      this.dayOffForm.get('reason')?.dirty
      )
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

  sendForm($event:any) {
    $event.preventDefault();  
    if(this.dayOffForm.invalid){
      return;
    }
    console.log("La vérification se lance : ");
    console.log(this.dayOffForm.get('dayOffType')?.value);
    console.log(this.dayOffForm.get('startDate')?.value);
    console.log(this.dayOffForm.get('endDate')?.value);
    console.log(this.dayOffForm.get('reason')?.value);
    this.modalService.dismissAll();
    this.resetDayOffForm();
  }
}