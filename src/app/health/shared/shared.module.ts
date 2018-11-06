import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Third-party module
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Components
import { ListItemComponent } from './components/list-item/list-item.component';

// Services
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  exports: [ListItemComponent],
  declarations: [ListItemComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService]
    };
  }
}
