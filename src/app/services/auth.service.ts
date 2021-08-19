import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  logout() :void{
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }
}
