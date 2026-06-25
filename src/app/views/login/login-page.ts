import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getSafeAuthReturnUrl } from '@services/auth/auth-return-url';
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
      [attr.aria-busy]="authStore.isPending()"
    >
      <hlm-card-header>
        <h1 hlmCardTitle>Login</h1>
        <p hlmCardDescription>Enter your details to login.</p>
      </hlm-card-header>

      <div hlmCardContent class="flex flex-col gap-4">
        @if (authStore.error(); as error) {
          <hlm-alert variant="destructive">
            <h2 hlmAlertTitle>Login failed</h2>
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
              autocomplete="current-password"
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
        <div class="flex w-full flex-col gap-3">
          <button
            hlmBtn
            type="submit"
            class="w-full"
            [disabled]="authStore.isPending() || form.invalid"
          >
            @if (authStore.isPending()) {
              <hlm-spinner aria-label="Logging in" />
            }
            Login
          </button>

          <a hlmBtn variant="link" routerLink="/auth/register" [queryParams]="returnUrlQueryParams">
            Create account
          </a>
        </div>
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
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class LoginPage {
  private readonly _fb = inject(FormBuilder).nonNullable;
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  protected readonly authStore = inject(AuthStore);
  protected readonly returnUrl = getSafeAuthReturnUrl(
    this._route.snapshot.queryParamMap.get('returnUrl'),
  );
  protected readonly returnUrlQueryParams = this.returnUrl ? { returnUrl: this.returnUrl } : null;

  readonly form = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  private readonly _navigateAfterAuth = effect(() => {
    if (this.authStore.isSuccess()) {
      void this._router.navigateByUrl(this.returnUrl ?? '/discover');
    }
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.authStore.isPending()) {
      return;
    }

    this.authStore.login(this.form.getRawValue());
  }
}
