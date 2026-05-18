import { Component, effect, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideSearch, lucideCircleUserRound } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon, HlmIcon, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './header.component.html',
  providers: [provideIcons({ lucideSearch, lucideCircleUserRound })],
})
export class HeaderComponent {
  protected readonly appTitle = 'ChiliFlow';
  //TMP solution
  protected isLogged = signal<boolean>(false);

  searchControl = new FormControl<string>('');
  searchChange = output<string>();

  private readonly searchValue = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchValue() ?? '');
    });
  }
}
