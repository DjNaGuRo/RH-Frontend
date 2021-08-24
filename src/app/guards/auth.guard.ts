import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    /*if (this.authService.isUserLoggedIn()) {
      console.log(this.authService.isUserLoggedIn())
      return true;
    }
    this.router.navigateByUrl('/login');
    this.notificationService.notify(NotificationType.ERROR, "Vous n'etes pas identifie")
    return false;*/
     if (localStorage.getItem('user')) {
      return true;
    } else {
      this.notificationService.notify(
        NotificationType.ERROR,
        "Vous n'etes pas identifie"
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
