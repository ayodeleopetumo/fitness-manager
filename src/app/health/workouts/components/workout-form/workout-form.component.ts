import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Workout } from '../../../shared/models/workouts/workout.interface';

@Component({
  selector: 'app-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">

        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input type="text" placeholder="e.g. English Breakfast" formControlName="name">
            <p class="error" *ngIf="required">Workout name is required</p>
          </label>

          <label>
            <h3>Type</h3>
            <app-workout-type formControlName="type"></app-workout-type>
          </label>
        </div>

        <div class="workout-form__submit">
          <div>
            <button *ngIf="!exists" class="button" type="button" (click)="createWorkout()"
              [disabled]="!isWorkoutNameValid">
              Create workout
            </button>

            <button *ngIf="exists" class="button" type="button"
              (click)="updateWorkout()" [disabled]="!isWorkoutNameValid">
              Save
            </button>

            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>

          <div class="workout-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">Yes</button>
              <button class="cancel" type="button" (click)="toggle()">No</button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>
          </div>
        </div>

      </form>
    </div>
  `
})
export class WorkoutFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: 'strength'
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  get isWorkoutNameValid() {
    const nameValue: string = this.form.get('name').value;
    return nameValue.length > 3;
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
