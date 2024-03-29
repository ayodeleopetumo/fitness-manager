import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Third-party module
import { DatabaseModule } from '@angular/fire/database';

// Components
import { ListItemComponent } from './components/list-item/list-item.component';

// Services
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ScheduleService } from './services/schedule/schedule.service';

// Pipes
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, DatabaseModule],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe],
  declarations: [ListItemComponent, JoinPipe, WorkoutPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService, ScheduleService]
    };
  }
}
