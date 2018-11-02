import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ScheduleComponent } from './containers/schedule/schedule.component';

const routes: Routes = [{ path: '', component: ScheduleComponent }];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [ScheduleComponent]
})
export class ScheduleModule {}
