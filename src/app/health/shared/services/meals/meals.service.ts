import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

import { Store } from 'store';
import { tap, map } from 'rxjs/operators';

import { Meal } from '../../models/meal.interface';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable()
export class MealsService {
  // meals$: Observable<Meal[]> = this.db
  //   .list<Meal>(`meals/${this.uid}`)
  //   .valueChanges()
  //   .pipe(tap(next => this.store.set('meals', next)));
  meals$: Observable<Meal[]> = this.db
    .list<Meal>(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(action => ({ key: action.key, ...action.payload.val() }))
      ),
      tap(next => this.store.set('meals', next))
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authSerivce: AuthService
  ) {}

  get uid() {
    return this.authSerivce.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
