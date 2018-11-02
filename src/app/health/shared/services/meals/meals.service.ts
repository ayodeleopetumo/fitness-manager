import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

import { Store } from 'store';
import { tap } from 'rxjs/operators';

import { Meal } from '../../models/meal.interface';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db
    .list<Meal>(`meals/${this.uid}`)
    .valueChanges()
    .pipe(tap(next => this.store.set('meals', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authSerivce: AuthService
  ) {}

  get uid() {
    return this.authSerivce.user.uid;
  }
}
