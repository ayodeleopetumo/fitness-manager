import { Component, OnInit } from '@angular/core';

import { Meal } from '../../../shared/models/meal.interface';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/food.svg" alt="food">
          <span>Create meal</span>
        </h1>
      </div>

      <div>
        <app-meal-form (create)="addMeal($event)"></app-meal-form>
      </div>
    </div>
  `
})
export class MealComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addMeal(meal: Meal) {
    console.log(meal);
  }
}
