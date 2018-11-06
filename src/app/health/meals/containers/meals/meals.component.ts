import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { MealsService } from '../../../shared/services/meals/meals.service';

import { Meal } from '../../../shared/models/meals/meal.interface';

import { Store } from 'store';

@Component({
  selector: 'app-meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="assets/food.svg" alt="food">
          Your meals
        </h1>
        <a class="btn__add" [routerLink]="['../meals/new']">
          <img src="assets/add-white.svg" alt="add">
          New meal
        </a>
      </div>

      <div class="" *ngIf="meals$ | async as meals; else loading;">
        <div class="message" *ngIf="!meals.length">
          <img src="assets/face.svg" alt="face">
          No meals, add a new meal to start
        </div>

        <app-list-item
          *ngFor="let meal of meals"
          [item]="meal"
          (remove)="removeMeal($event)">
        </app-list-item>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="assets/loading.svg" alt="loading...">
          Fetching meals
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(private mealsService: MealsService, private store: Store) {}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(meal: Meal) {
    this.mealsService.removeMeal(meal.key);
  }
}
