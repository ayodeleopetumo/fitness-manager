import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { User } from './app/auth/shared/models/user.interface';
import { Meal } from './app/health/shared/models/meals/meal.interface';
import { Workout } from './app/health/shared/models/workouts/workout.interface';

export interface State {
  user: User;
  meals: Meal[];
  workouts: Workout[];
  date: Date;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined,
  date: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, status: any) {
    this.subject.next({ ...this.value, [name]: status });
  }
}
