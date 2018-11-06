import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      {{ date | json }}
    </div>
  `
})
export class ScheduleCalendarComponent implements OnInit, OnDestroy {
  @Input()
  date: Date;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
