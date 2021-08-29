import {Collaborator} from 'src/app/model/collaborator';
import {NotifierService} from 'angular-notifier';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {NotificationType} from '../../enum/notification-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  submitted = false;
  private subscriptions: Subscription[] = [];
  isDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }

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
  }

  // @ts-ignore
  onLogin(user: Collaborator): void {
    this.isDisabled=true;
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<Collaborator>) => {

          const token = response.headers.get('Jwt-Token');

          // @ts-ignore
          this.authService.saveToken(token);
          this.authService.addUserToLocalCache(<Collaborator>response.body);
          this.notifierService.notify(
            NotificationType.SUCCESS,
            'Vous etes connecte !'
          );
          this.router.navigateByUrl('/');
        },
        (error: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, error.error.text);
        }
      )
    );
  }

  private sendErrorNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(
        notificationType,
        'Une erreur est survenue. svp recommencer !'
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
