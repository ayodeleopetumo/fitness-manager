import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <app-schedule-calendar
        [date]="date$ | async">
      </app-schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  constructor(private store: Store, private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.date$ = this.store.select<Date>('date');
    this.subscriptions = [this.scheduleService.schedule$.subscribe()];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
