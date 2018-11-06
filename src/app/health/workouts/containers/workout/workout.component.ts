import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Workout } from '../../../shared/models/workouts/workout.interface';

import { WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  styleUrls: ['Workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="assets/workout.svg" alt="workout">
          <span *ngIf="workout$ | async as Workout; else title">{{ Workout.name ? 'Edit': 'Create '}} Workout</span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>

      <div *ngIf="workout$ | async as workout; else loading">
        <app-workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)">
        </app-workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/loading.svg" alt="loading...">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private worksService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.worksService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(param => {
        return this.worksService.getWorkout(param.id);
      })
    );
  }

  async addWorkout(workout: Workout) {
    await this.worksService.addWorkout(workout);
    this.backToWorkouts();
  }

  async updateWorkout(workout: Workout) {
    const key = this.route.snapshot.params.id;
    await this.worksService.updateWorkout(key, workout);
    this.backToWorkouts();
  }

  async removeWorkout() {
    const key = this.route.snapshot.params.id;
    await this.worksService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
