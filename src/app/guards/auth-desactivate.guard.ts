import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {NotificationType} from "../enum/notification-type.enum";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthDesactivateGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private notificationService:NotificationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
      return true;
    }else{
      return false;
    }
  }
}
