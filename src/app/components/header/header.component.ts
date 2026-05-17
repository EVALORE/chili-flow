import { Component, signal } from '@angular/core';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports  } from '@spartan-ng/helm/input';
import { LucideCircleUserRound, LucideSearch } from '@lucide/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, LucideCircleUserRound, LucideSearch, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly appTitle = 'ChiliFlow';

  //TMP solution
  protected isLogged = signal<boolean>(false);
}
