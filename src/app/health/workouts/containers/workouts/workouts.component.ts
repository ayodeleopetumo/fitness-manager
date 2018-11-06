import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';

import { Workout } from '../../../shared/models/workouts/workout.interface';

import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="assets/workout.svg" alt="workout">
          Your workouts
        </h1>
        <a class="btn__add" [routerLink]="['../workouts/new']">
          <img src="assets/add-white.svg" alt="add">
          New workout
        </a>
      </div>

      <div class="" *ngIf="workouts$ | async as workouts; else loading;">
        <div class="message" *ngIf="!workouts.length">
          <img src="assets/face.svg" alt="face">
          No workouts, add a new workout to start
        </div>

        <app-list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)">
        </app-list-item>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="assets/loading.svg" alt="loading...">
          Fetching workouts...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(private workoutsService: WorkoutsService, private store: Store) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>('workouts');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(meal: Workout) {
    this.workoutsService.removeWorkout(meal.key);
  }
}
