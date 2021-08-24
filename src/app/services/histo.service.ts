import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Collaborator} from "../model/collaborator";

@Injectable({
  providedIn: 'root',
})
export class HistoService {
  private host = environment;
  constructor(private http: HttpClient) {}

  public getAllDayOff(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(this.host.apiUrl + '/calendar/' );
  }
}
