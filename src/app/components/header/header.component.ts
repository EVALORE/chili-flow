import { Component, DestroyRef, effect, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LucideCircleUserRound, LucideSearch } from '@lucide/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HlmButtonImports,
    HlmInputImports,
    LucideCircleUserRound,
    LucideSearch,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
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
