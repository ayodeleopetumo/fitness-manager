import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Meal } from '../../../shared/models/meals/meal.interface';

import { MealsService } from '../../../shared/services/meals/meals.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/food.svg" alt="food">
          <span *ngIf="meal$ | async as meal; else title">{{ meal.name ? 'Edit': 'Create '}} meal</span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>

      <div *ngIf="meal$ | async as meal; else loading">
        <app-meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </app-meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/loading.svg" alt="loading...">
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap(param => {
        return this.mealsService.getMeal(param.id);
      })
    );
  }

  async addMeal(meal: Meal) {
    await this.mealsService.addMeal(meal);
    this.backToMeals();
  }

  async updateMeal(meal: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, meal);
    this.backToMeals();
  }

  async removeMeal() {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
