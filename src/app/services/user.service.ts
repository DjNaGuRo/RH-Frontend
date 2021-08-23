import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Collaborator } from '../model/collaborator';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http:HttpClient) {
  }

  getCollaborators() {
    return this.http.get<Collaborator[]>(environment.urlResourceCalendar)
  }
  getCollaborator() {
    return this.http.get<Collaborator>(environment.urlResourceCollaborator)
  }
}
