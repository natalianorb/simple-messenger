import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as UserActions from '../../store/user/user.actions';
import {
  selectUserError,
  selectUserLoading,
} from '../../store/user/user.selectors';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  loading$;
  error$;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      this.store.dispatch(UserActions.signUp({ name, email, password }));
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
