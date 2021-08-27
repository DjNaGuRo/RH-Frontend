import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DayOff, DayOffToCreate } from '../model/dayOff';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  constructor(private http:HttpClient) {
  }

  createDayOff(dayOffToCreate : DayOffToCreate) {
    return this.http.post<DayOff>(environment.urlResourceAddDayOff, dayOffToCreate)
  }
  deleteDayOff(dayOff:DayOff) {
    return this.http.post<string>(environment.urlResourceDeleteDayOff, dayOff)
  }
  findDayOff(id:number) {
    return this.http.get<DayOff>(environment.urlResourceFindDayOff)
  }
}
