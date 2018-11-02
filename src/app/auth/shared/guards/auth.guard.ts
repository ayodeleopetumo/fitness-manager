import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.authState.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      })
    );
  }
}
