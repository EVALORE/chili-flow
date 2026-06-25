import { Component, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideCircleUserRound, lucideHome } from '@ng-icons/lucide';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HlmInputImports,
    HlmButtonImports,
  ],
  templateUrl: './header.component.html',
  providers: [provideIcons({ lucideSearch, lucideCircleUserRound, lucideHome })],
})
export class HeaderComponent {
  protected readonly appTitle = 'ChiliFlow';
  //TMP solution
  protected isLogged = signal<boolean>(false);
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
