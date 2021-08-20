
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NotifierService} from "angular-notifier";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public router: Router,
    public notifier: NotifierService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
  }
}
