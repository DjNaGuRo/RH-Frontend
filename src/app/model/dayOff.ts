import { DayOffStatusEnum } from '../enum/dayoff-status-enum';
import { DayOffTypeEnum } from './../enum/dayoff-type-enum';
import { Collaborator } from './collaborator';
export interface DayOff {
  id:number,
  requestDate:string,
  startDate:string,
  endDate:string,
  type:DayOffTypeEnum,
  reason:string,
  status:DayOffStatusEnum,
  collaborators:Collaborator[]
}
