import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/components/navigation.component';
import { HeaderComponent } from './header/components/header.component';
import { Store } from '../store';
import { AuthService } from './auth/shared/services/auth/auth.service';

describe('AppComponent', () => {
  let mockStore;
  let mockAuthService;
  const user = {
    email: 'aopetumo@gmail.com',
    uid: '12345678',
    authenticated: true
  };

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj(['value', 'select', 'set']);
    mockAuthService = jasmine.createSpyObj([
      'user',
      'authState',
      'createUser',
      'loginUser',
      'logoutUser'
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, NavigationComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  // it(`should have as title 'fitness-manager-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('fitness-manager-app');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'Welcome to fitness-manager-app!'
  //   );
  // });
});
