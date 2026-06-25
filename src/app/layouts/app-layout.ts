import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '@components/header';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `
    <app-header (searchChange)="onSearch($event)" />
    <main class="flex w-full flex-1">
      <router-outlet />
    </main>
  `,
  imports: [Header, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex min-h-svh flex-col',
  },
})
export class AppLayout {
  onSearch(search: string) {
    if (search !== '') {
      console.log('TMP handler implementation. Search text - ' + search);
    }
  }
}
