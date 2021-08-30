import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Collaborator } from '../model/collaborator';
import { User } from '../model/user';
import { Subject } from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private collaborators?:Collaborator[]
  collaborator?: Collaborator

  constructor(private http:HttpClient) {
  }

  getCollaborators() {
    if(this.collaborators) {

      return this.http.get<Collaborator[]>(environment.urlResourceCalendar)
    }
    return this.http.get<Collaborator[]>(environment.urlResourceCalendar)
    .pipe(
      tap(collaborators => this.collaborators = collaborators)
    )
  }
  getCollaborator() {
    if (this.collaborator) {
      return this.http.get<Collaborator>(environment.urlResourceCollaborator)
    }
    return this.http.get<Collaborator>(environment.urlResourceCollaborator)
    .pipe(
      tap(collaborator => this.collaborator = collaborator)
    )
  }

}
