import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <button type="submit">Login</button>
        <a routerLink="/auth/register">Not registered?</a>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  loginUser(formData: FormGroup) {
    console.log(formData.value);
  }
}
