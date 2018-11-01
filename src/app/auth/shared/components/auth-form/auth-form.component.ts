import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['auth-form.component.scss'],
  templateUrl: 'auth-form.component.html'
})
export class AuthFormComponent implements OnInit {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get emailFormat() {
    const emailControl = this.form.get('email');
    return emailControl.hasError('email') && emailControl.touched;
  }

  get passwordInvalid() {
    const passwordControl = this.form.get('password');
    return passwordControl.hasError('required') && passwordControl.touched;
  }
}
