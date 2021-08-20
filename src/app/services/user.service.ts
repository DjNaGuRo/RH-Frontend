import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Collaborator } from '../model/collaborator';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

  getCollaborator() {
    return this.http.get<Collaborator[]>(environment.urlResourceCalendar)
  }
}
