import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AuthFormComponent } from './components/auth-form/auth-form.component';

// Services
import { AuthService } from './services/auth/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard]
    };
  }
}
