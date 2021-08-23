import { CollaboratorRoleEnum } from './../enum/collaborator-role-enum';
import { DayOff } from "./dayOff";
import { Department } from "./department";

export interface Collaborator {
  id: number;
  firstName: string;
  lastName: string;
  role: CollaboratorRoleEnum;
  hiringDate: string;
  email: string;
  password: string;
  department: Department;
  username: string;
  daysOffs: DayOff[];
  active: boolean;
  notLocked: boolean;
  authorities: [];
}
