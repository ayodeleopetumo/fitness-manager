import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { Meal } from '../../../shared/models/meals/meal.interface';
import { Workout } from '../../../shared/models/workouts/workout.interface';

@Component({
  selector: 'app-schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img
              src="assets/{{ section.type === 'workouts' ? 'workout' : 'food' }}.svg"
              alt="Section type"
            />
            Assign {{ section.type }}
          </h1>

          <a class="btn__add" [routerLink]="getRoute(section.type)">
            <img src="assets/add-white.svg" alt="Add" /> New {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span class="schedule-assign__empty" *ngIf="!list?.length">
            <img src="assets/face.svg" /> Nothing here to assign
          </span>

          <div
            *ngFor="let item of list"
            [class.active]="itemExists(item.name)"
            (click)="toggleItem(item.name)"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button class="button" type="button" (click)="updateAssign()">
              Update
            </button>

            <button
              class="button button--cancel"
              type="button"
              (click)="cancelAssign()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {
  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  itemExists(itemName: string) {
    // tslint:disable-next-line:no-bitwise
    return !!~this.selected.indexOf(itemName);
  }

  toggleItem(itemName: string) {
    if (this.itemExists(itemName)) {
      this.selected = this.selected.filter(item => item !== itemName);
    } else {
      this.selected = [...this.selected, itemName];
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
