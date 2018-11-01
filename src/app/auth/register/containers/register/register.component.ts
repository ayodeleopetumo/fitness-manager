import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  template: `
    <div>
      <app-auth-form (submitted)="createAccount($event)">
        <h1>Register</h1>
        <button type="submit">Create account</button>
        <a routerLink="/auth/login">Already have an account?</a>
      </app-auth-form>
    </div>
  `
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  createAccount(formData: FormGroup) {
    console.log(formData);
  }
}
