import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Store } from 'store';

// Third-party imports
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from '../../models/user.interface';

@Injectable()
export class AuthService {
  auth$ = this.af.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };

      this.store.set('user', user);
    })
  );

  constructor(private af: AngularFireAuth, private store: Store) {}

  get user() {
    return this.af.currentUser;
  }

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.signOut();
  }
}
