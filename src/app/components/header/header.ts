import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideCircleUserRound, lucideHome } from '@ng-icons/lucide';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AuthStore } from '@services/auth/auth-store';

@Component({
  selector: 'app-header',
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HlmInputImports,
    HlmButtonImports,
  ],
  templateUrl: './header.html',
  providers: [provideIcons({ lucideSearch, lucideCircleUserRound, lucideHome })],
})
export class Header {
  readonly authStore = inject(AuthStore);

  protected searchControl = new FormControl<string>('');
  searchChange = output<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map((value) => (value ?? '').trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.searchChange.emit(value));
  }
}
