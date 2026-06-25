import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `
    <main class="flex min-h-svh w-full items-center justify-center px-4 py-10">
      <section aria-label="authentication" class="w-full max-w-md">
        <router-outlet />
      </section>
    </main>
  `,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-svh',
  },
})
export class AuthLayout {}
