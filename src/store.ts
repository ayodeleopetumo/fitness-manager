import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { User } from './app/auth/shared/models/user.interface';
import { Meal } from './app/health/shared/models/meals/meal.interface';
import { Workout } from './app/health/shared/models/workouts/workout.interface';
import { ScheduleItem } from './app/health/shared/models/schedules/schedule-item.interface';

export interface State {
  user: User;
  meals: Meal[];
  schedule: ScheduleItem[];
  workouts: Workout[];
  date: Date;
  selected: any;
  list: any;
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  schedule: undefined,
  workouts: undefined,
  date: undefined,
  selected: undefined,
  list: undefined
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
