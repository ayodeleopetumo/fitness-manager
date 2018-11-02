import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Shared modules
import { SharedModule } from './shared/shared.module';

// Guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'meals',
    canActivate: [AuthGuard],
    loadChildren: './meals/meals.module#MealsModule'
  },
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: './schedule/schedule.module#ScheduleModule'
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: './workouts/workouts.module#WorkoutsModule'
  }
];

@NgModule({
  imports: [SharedModule.forRoot(), RouterModule.forChild(routes)]
})
export class HealthModule {}
