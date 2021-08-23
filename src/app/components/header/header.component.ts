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
  user!: User;
  constructor(
    public router: Router,
    public notifier: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  logOut() {
    this.authService.logOut();
  }

  getUser(): User {
    this.user = this.authService.getUserFromLocalCache();
    return this.user;
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
