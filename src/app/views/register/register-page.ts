import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@services/auth/auth.store';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  template: `
    <form
      hlmCard
      class="w-full"
      [formGroup]="form"
      (ngSubmit)="submit()"
      [attr.aria-busy]="authStore.loading()"
    >
      <hlm-card-header>
        <h1 hlmCardTitle>Create account</h1>
        <p hlmCardDescription>Enter your details to register.</p>
      </hlm-card-header>

      <div hlmCardContent class="flex flex-col gap-4">
        @if (authStore.error(); as error) {
          <hlm-alert variant="destructive">
            <h2 hlmAlertTitle>Registration failed</h2>
            <p hlmAlertDescription>{{ error }}</p>
          </hlm-alert>
        }

        <hlm-field-group>
          <hlm-field>
            <label hlmFieldLabel for="email">Email</label>
            <input
              hlmInput
              type="email"
              autocomplete="email"
              placeholder="example@mail.com"
              id="email"
              formControlName="email"
              required
            />
            <hlm-field-error validator="required">Email is required.</hlm-field-error>
            <hlm-field-error validator="email">Enter a valid email address.</hlm-field-error>
          </hlm-field>

          <hlm-field>
            <label hlmFieldLabel for="password">Password</label>
            <input
              hlmInput
              type="password"
              autocomplete="new-password"
              id="password"
              formControlName="password"
              required
            />
            <hlm-field-error validator="required">Password is required.</hlm-field-error>
            <hlm-field-error validator="minlength">
              Password must be at least 8 characters.
            </hlm-field-error>
          </hlm-field>
        </hlm-field-group>
      </div>

      <hlm-card-footer>
        <button
          hlmBtn
          type="submit"
          class="w-full"
          [disabled]="authStore.loading() || form.invalid"
        >
          @if (authStore.loading()) {
            <hlm-spinner aria-label="Creating account" />
          }
          Create account
        </button>
      </hlm-card-footer>
    </form>
  `,
  imports: [
    HlmAlertImports,
    HlmButtonImports,
    HlmCardImports,
    HlmFieldImports,
    HlmInputImports,
    HlmSpinnerImports,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class RegisterPage {
  private readonly _fb = inject(FormBuilder).nonNullable;
  protected readonly authStore = inject(AuthStore);

  readonly form = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.authStore.canSubmit()) {
      return;
    }

    this.authStore.register(this.form.getRawValue());
  }
}
