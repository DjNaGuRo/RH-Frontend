import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
user!:User
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
  }

}
