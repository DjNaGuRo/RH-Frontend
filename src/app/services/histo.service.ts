import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoService {
  private host = environment;
  constructor(private http: HttpClient) {}

  public getAllDayOff(): Observable<any[]> {
    return this.http.get<any>(this.host.apiUrl + '/calendar');
  }
}
