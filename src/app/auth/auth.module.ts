import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Third-party modules
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';

// Shared modules
import { SharedModule } from './shared/shared.module';

// Environment settings
import { environment } from '../../environments/environment';

export const firebaseConfig: FirebaseAppConfig = environment.firebaseConfig;

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
