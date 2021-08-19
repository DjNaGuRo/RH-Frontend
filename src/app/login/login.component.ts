import {NotifierService} from 'angular-notifier';
import {HeaderType} from './../enum/header-type-enum';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user';
import {Subscription} from 'rxjs';
import {NotificationType} from '../enum/notification-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  submitted = false;
  private subscription: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get formValid() {
    return this.formLogin.controls;
  }

  onSubmit($event: any): void {
    $event.preventDefault();
    this.submitted = true;

    if (this.formLogin.invalid) {
      console.warn('Your order has been submitted', this.formLogin.value);
      return;
    }
    this.onLogin(this.formLogin.value);
    this.router.navigateByUrl('/');
  }

  // @ts-ignore
  onLogin(user: User): User {
    this.subscription.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          // @ts-ignore
          this.authService.saveToken(token);
          this.authService.addUserToLocalCache(<User>response.body);
          this.notifierService.notify(
            NotificationType.SUCCESS,
            'Vous etes connecte !'
          );
          this.router.navigateByUrl('/test');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    );
  }
}
