import {Collaborator} from 'src/app/model/collaborator';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CollaboratorRoleEnum} from "../../enum/collaborator-role-enum";
import {DayOffFormComponent} from "../day-off-form/day-off-form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: Collaborator;
  authorize = true;

  constructor(private authService: AuthService,private modalService: NgbModal) {
  }
  public user2 = {name: 'Izzat Nadiri', age: 26};

  openModal() {const modalRef = this.modalService.open(DayOffFormComponent);
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Do you want to cancel?';

    modalRef.result.then((userResponse) => {
      console.log(`User's choice: ${userResponse}`)
    });  }
  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
    // @ts-ignore
    if (this.user.role !== CollaboratorRoleEnum.MANAGER) {
      this.authorize = false;
    }
  }

  get isAdmin(): boolean {
    if (this.user.role === CollaboratorRoleEnum.ADMINISTRATOR) {
      return true;
    }
    return false;
  }

  get isManager(): boolean {
    if (this.user.role === CollaboratorRoleEnum.MANAGER) {
      return true;
    }
    return false;
  }
}
