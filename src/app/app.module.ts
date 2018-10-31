import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Observable store
import { Store } from 'store';

// Feature modules

// Containers

// Components

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
