import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

import { ScheduleItem } from '../../../shared/models/schedules/schedule-item.interface';
import { ScheduleList } from '../../../shared/models/schedules/schedule-list.interface';

@Component({
  selector: 'app-schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <app-schedule-controls [selected]="selectedDay" (move)="onChange($event)">
      </app-schedule-controls>

      <app-schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)"
      >
      </app-schedule-days>

      <app-schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)"
      >
      </app-schedule-section>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;
  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks & Drinks' }
  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  items: ScheduleList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
    this.selectedDayIndex = this.getToday(this.selectedDay);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;

    if (today < 0) {
      today = 6;
    }
    return today;
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }
}
