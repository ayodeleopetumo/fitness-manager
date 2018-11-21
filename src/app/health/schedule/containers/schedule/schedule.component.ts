import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { MealsService } from '../../../shared/services/meals/meals.service';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';

import { Meal } from '../../../shared/models/meals/meal.interface';
import { Workout } from '../../../shared/models/workouts/workout.interface';
import { ScheduleItem } from '../../../shared/models/schedules/schedule-item.interface';

@Component({
  selector: 'app-schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <app-schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      >
      </app-schedule-calendar>

      <app-schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()"
      >
      </app-schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;
  subscriptions: Subscription[] = [];

  date$: Observable<Date>;
  selected$: Observable<any>;
  schedule$: Observable<ScheduleItem[]>;
  list$: Observable<Meal[] | Workout[]>;

  constructor(
    private store: Store,
    private mealService: MealsService,
    private workoutService: WorkoutsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select<Date>('date');
    this.schedule$ = this.store.select<ScheduleItem[]>('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe()
    ];
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(data) {
    this.open = true;
    this.scheduleService.selectSection(data);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
