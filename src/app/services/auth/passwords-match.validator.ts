import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

interface PasswordControls {
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

const hasPasswordControls = (control: AbstractControl): control is FormGroup<PasswordControls> =>
  control instanceof FormGroup &&
  'password' in control.controls &&
  'confirmPassword' in control.controls;

export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (!hasPasswordControls(control)) {
    return null;
  }

  return control.controls.password.value === control.controls.confirmPassword.value
    ? null
    : { passwordMismatch: true };
};
