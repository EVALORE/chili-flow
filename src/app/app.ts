import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@components/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  host: {
    class: 'block min-h-svh bg-background text-foreground',
  },
})
export class App {
  protected readonly title = signal('ChiliFlow');

  onSearch(search: string) {
    if (search !== '') {
      console.log('TMP handler implementation. Search text - ' + search);
    }
  }
}
