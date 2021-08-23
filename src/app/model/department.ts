import { Collaborator } from "./collaborator";

export interface Department {
  id:number,
  name:string,
  collaborators:Collaborator[]
}
