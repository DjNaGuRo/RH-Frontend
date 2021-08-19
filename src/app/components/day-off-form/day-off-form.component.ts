import {Component, OnInit} from '@angular/core';
import { DaysOff } from '../../model/daysOff';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

imports: [NgbModule]

@Component({
  selector: 'day-off-form',
  templateUrl: './day-off-form.component.html'
})

export class DayOffFormComponent {
  closeResult = '';
  minEndDate!:NgbDateStruct; 
  dayOffForm!: FormGroup;

  current = new Date();
  minDate:NgbDateStruct = { year: this.current.getFullYear(), month: 
    this.current.getMonth() + 1, day: this.current.getDate()+1 };

  constructor(private modalService: NgbModal,private fb: FormBuilder, private config: NgbDatepickerConfig) {
    
    console.log(this.dayOffForm);
    config.outsideDays = 'hidden';
  }
  
  
  ngOnInit(): void {
    this.dayOffForm = this.fb.group(
      {
        'dayOffType': ['', [Validators.required]], 
        'startDate': ['', [Validators.required]], 
        'endDate': ['', [Validators.required]] 
      },{
        updateOn: 'blur',
      });
      this.dayOffForm.get('startDate')?.valueChanges.subscribe(startDate=>this.minEndDate=startDate);

  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  // test appel fonction avec le bouton submit
  verifForm() {
      console.log("La vérification se lance : ");
      console.log(this.dayOffForm.get('startDate')?.value);
      console.log(this.dayOffForm.get('endDate')?.value);
      console.log(this.dayOffForm.get('dayOffType')?.value);
  }
}

// exemple de ROSSI


// @Component({
//   selector: 'app-nouveau-collegue-reactive-form',
//   templateUrl: './nouveau-collegue-reactive-form.component.html',
//   styleUrls: ['./nouveau-collegue-reactive-form.component.css'],
// })
// export class NouveauCollegueReactiveFormComponent implements OnInit {
//   formCollegue!: FormGroup;

//   constructor(private fb: FormBuilder, private dataSrv: DataService, private router: Router) {
//   }

//   ngOnInit(): void {
//     this.formCollegue = this.fb.group(
//       {
//         'pseudo': ['', [Validators.required, Validators.min(2)], [this.validerPseudo.bind(this)]],
//         'nom': ['', [Validators.required, Validators.min(2)]],
//         'prenom': ['', [Validators.required, Validators.min(2)]],
//         'photo': ['', [Validators.required, Validators.min(2)]],
//       }, {
//         // validateur qui s'applique à l'ensemble du formulaire
//         validators: [this.validerNomEtPrenomNonIdentique.bind(this)],
//         updateOn: 'blur'
//       }
//     );
//   }

//   validerPseudo(control: AbstractControl): Observable<ValidationErrors | null> {

//     return this.dataSrv
//       .findCollegue(control.value)
//       .pipe(
//         // si la requête est ok => le pseudo saisi existe => ko pour nous
//         map(() => <ValidationErrors>{ pseudoExistant: true }),
//         // si la requête échoue => pseudo n'existe pas => ok pour nous
//         catchError(() => of(null))
//       );

//   }



//   validerNomEtPrenomNonIdentique(control: FormControl): ValidationErrors | null {
//     if (!control.value.nom  || control.value.nom != control.value.prenom) {
//       return null;
//     }
//     return {nomPrenomIdentique: true};
//   }

//   creerDaysOff() {
//     let collegue: Collegue = this.formCollegue.value;

//     this.dataSrv.creerCollegue(collegue)
//       .subscribe(() => this.redirectAccueil());
//   }

//   get isPseudoInvalid() {
//     return (
//       this.formCollegue.get('pseudo')?.invalid &&
//       this.formCollegue.get('pseudo')?.dirty
//     );
//   }

//   get isNomInvalid() {
//     return (
//       this.formCollegue.get('nom')?.invalid &&
//       this.formCollegue.get('nom')?.dirty
//     );
//   }

//   get isPrenomInvalid() {
//     return (
//       this.formCollegue.get('prenom')?.invalid &&
//       this.formCollegue.get('prenom')?.dirty
//     );
//   }

//   get isPhotoInvalid() {
//     return (
//       this.formCollegue.get('photo')?.invalid &&
//       this.formCollegue.get('photo')?.dirty
//     );
//   }

//   redirectAccueil() {
//     this.router.navigateByUrl("")
//   }
// }
