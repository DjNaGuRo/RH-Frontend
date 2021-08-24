export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
