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
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
  },
  {
    path: 'schedule',
    canActivate: [AuthGuard],
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'workouts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule)
  }
];

@NgModule({
  imports: [SharedModule.forRoot(), RouterModule.forChild(routes)]
})
export class HealthModule {}
