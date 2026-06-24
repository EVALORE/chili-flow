import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@services/authorization/auth.store';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard, HlmCardContent, HlmCardFooter } from '@spartan-ng/helm/card';

@Component({
  template: `
    <hlm-card>
      <form [formGroup]="form" hlmCardContent>
        <div>
          <legend hlmFieldLegend>Registration</legend>
          <div hlmFieldGroup>
            <div hlmField>
              <label hlmFieldLabel for="email">Email</label>
              <input
                hlmInput
                type="text"
                placeholder="example@mail.com"
                id="email"
                formControlName="email"
              />
            </div>
            <div hlmField>
              <label hlmFieldLabel for="password">Password</label>
              <input hlmInput type="password" id="password" formControlName="password" />
            </div>
          </div>
        </div>
      </form>
      <hlm-card-footer hlmField>
        <button hlmBtn type="submit">Submit</button>
      </hlm-card-footer>
    </hlm-card>
  `,
  imports: [
    HlmButton,
    HlmFieldImports,
    HlmLabelImports,
    HlmInputImports,
    ReactiveFormsModule,
    HlmCard,
    HlmCardContent,
    HlmCardFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class RegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authStore = inject(AuthStore);

  readonly form = this._fb.group({
    email: this._fb.control('', [Validators.required]),
    password: this._fb.control('', [Validators.required]),
  });

  submit() {
    console.log(this.form);
  }
}
