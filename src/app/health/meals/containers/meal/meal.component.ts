import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      I am a meal!
    </div>
  `
})
export class MealComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
