import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-login',
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <button type="submit">Login</button>
        <a routerLink="/auth/register">Not registered?</a>
        <div class="error" *ngIf="error">{{ error }}</div>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async loginUser(formData: FormGroup) {
    const { email, password } = formData.value;

    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err;
    }
  }
}
