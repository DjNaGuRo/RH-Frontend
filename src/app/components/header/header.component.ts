import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router,public notifier:NotifierService) {}

  ngOnInit(): void {}


}
