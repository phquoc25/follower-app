import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidators } from '../common/validators/password.validators';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  form;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      oldPassword: ['', Validators.required, PasswordValidators.oldPasswordInvalid],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  verifyConfirmPassword() {
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({passwordsDontMatch: true});
    }
  }

  get oldPassword(): FormControl {
    return this.form.get('oldPassword');
  }

  get newPassword(): FormControl {
    return this.form.get('newPassword');
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword');
  }
}
