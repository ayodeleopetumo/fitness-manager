import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// Containers
import { MealsComponent } from './containers/meals/meals.component';

const routes: Routes = [{ path: '', component: MealsComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [],
  declarations: [MealsComponent]
})
export class MealsModule {}
