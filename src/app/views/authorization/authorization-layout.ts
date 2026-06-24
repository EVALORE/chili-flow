import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `
    <main class="flex items-center justify-center">
      <section aria-label="Authorization" class="w-full max-w-md">
        <router-outlet />
      </section>
    </main>
  `,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full',
  },
})
export class AuthorizationLayout {}
