import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: [
        '',
        Validators.required,
        Validators.pattern('^[a-z]+.[a-z]+$'),
      ],
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
  }
}
