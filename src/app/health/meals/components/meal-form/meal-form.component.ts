import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Meal } from '../../../shared/models/meal.interface';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">

        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input type="text" placeholder="e.g. English Breakfast" formControlName="name">
            <p class="error" *ngIf="required">Workout name is required</p>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button type="button" class="meal-form__add" (click)="addIngredient()">
              <img src="assets/add-white.svg" alt="add food">
              Add food
            </button>
          </div>

          <div formArrayName="ingredients">
            <label *ngFor="let control of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs">
              <span class="meal-form__remove" (click)="removeIngredient(i)"></span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button class="button" type="button" (click)="createMeal()" [disabled]="!isMealNameValid">
              Create meal
            </button>

            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
        </div>

      </form>
    </div>
  `
})
export class MealFormComponent implements OnInit {
  @Output()
  create = new EventEmitter<Meal>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  get isMealNameValid() {
    const nameValue: string = this.form.get('name').value;
    return nameValue.length > 3;
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
    console.log(index);
  }
}
