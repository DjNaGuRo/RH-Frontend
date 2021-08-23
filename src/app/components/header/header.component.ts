import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public router: Router,
    public notifier: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
  }

  getUsername():User{
    return this.authService.getUserFromLocalCache();
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
