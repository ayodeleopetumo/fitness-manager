import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MealsService } from '../../../shared/services/meals/meals.service';

import { Meal } from '../../../shared/models/meal.interface';

import { Store } from 'store';

@Component({
  selector: 'app-meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
      {{ meals$ | async | json }}
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
}
