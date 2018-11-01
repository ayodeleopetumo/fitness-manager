import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { User } from './auth/shared/models/user.interface';

import { AuthService } from './auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitness-manager-app';
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
