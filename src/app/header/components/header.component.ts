import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { User } from '../../auth/shared/models/user.interface';

@Component({
  selector: 'app-header',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="../../../assets/logo.svg" alt="Fuel Fitness Manager logo">

        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `
})
export class HeaderComponent implements OnInit {
  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user: User;

  constructor() {}

  ngOnInit() {}

  logoutUser() {
    this.logout.emit();
  }
}
