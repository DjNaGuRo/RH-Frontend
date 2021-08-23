import { Collaborator } from 'src/app/model/collaborator';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: Collaborator;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
  }
}
