import { FormControl, FormGroup } from '@angular/forms';

import { passwordsMatchValidator } from './passwords-match.validator';

describe('passwordsMatchValidator', () => {
  it('should return null when password and confirmation match', () => {
    const form = new FormGroup(
      {
        password: new FormControl('password123', { nonNullable: true }),
        confirmPassword: new FormControl('password123', { nonNullable: true }),
      },
      { validators: passwordsMatchValidator },
    );

    expect(form.errors).toBeNull();
  });

  it('should return passwordMismatch when password and confirmation differ', () => {
    const form = new FormGroup(
      {
        password: new FormControl('password123', { nonNullable: true }),
        confirmPassword: new FormControl('different123', { nonNullable: true }),
      },
      { validators: passwordsMatchValidator },
    );

    expect(form.errors).toEqual({ passwordMismatch: true });
  });
});
