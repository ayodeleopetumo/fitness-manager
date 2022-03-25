import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable, of } from 'rxjs';

import { Store } from 'store';
import { tap, map, filter } from 'rxjs/operators';

import { Meal } from '../../models/meals/meal.interface';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable()
export class MealsService {
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
    return this.authSerivce.user;
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map(meals => meals.find((meal: Meal) => meal.key === key))
    );
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
