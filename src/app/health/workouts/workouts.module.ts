import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { WorkoutsComponent } from './containers/workouts/workouts.component';

const routes: Routes = [{ path: '', component: WorkoutsComponent }];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [WorkoutsComponent]
})
export class WorkoutsModule {}
