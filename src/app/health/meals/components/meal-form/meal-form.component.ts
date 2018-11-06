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

import { Meal } from '../../../shared/models/meals/meal.interface';

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
            <p class="error" *ngIf="required">Meal name is required</p>
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
            <button *ngIf="!exists" class="button" type="button" (click)="createMeal()"
              [disabled]="!isMealNameValid">
              Create meal
            </button>

            <button *ngIf="exists" class="button" type="button"
              (click)="updateMeal()" [disabled]="!isMealNameValid">
              Save
            </button>

            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeMeal()">Yes</button>
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
export class MealFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

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

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
