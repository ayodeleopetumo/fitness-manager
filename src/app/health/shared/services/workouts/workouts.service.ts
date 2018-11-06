import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';

import { Store } from 'store';
import { tap, map, filter } from 'rxjs/operators';

import { Workout } from '../../models/workouts/workout.interface';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.db
    .list<Workout>(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(action => ({ key: action.key, ...action.payload.val() }))
      ),
      tap(next => this.store.set('workouts', next))
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authSerivce: AuthService
  ) {}

  get uid() {
    return this.authSerivce.user.uid;
  }

  getWorkout(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map(workouts => workouts.find((workout: Workout) => workout.key === key))
    );
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
