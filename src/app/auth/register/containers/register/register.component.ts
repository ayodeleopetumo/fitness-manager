import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-register',
  template: `
    <div>
      <app-auth-form (submitted)="createAccount($event)">
        <h1>Register</h1>
        <button type="submit">Create account</button>
        <a routerLink="/auth/login">Already have an account?</a>
        <div class="error" *ngIf="error">{{ error }}</div>
      </app-auth-form>
    </div>
  `
})
export class RegisterComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async createAccount(formData: FormGroup) {
    const { email, password } = formData.value;

    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err;
    }
  }
}
