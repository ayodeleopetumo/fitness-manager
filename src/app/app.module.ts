import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Observable store
import { Store } from 'store';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

// Containers

// Components
import { HeaderComponent } from './header/components/header.component';
import { NavigationComponent } from './navigation/components/navigation.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HealthModule],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
