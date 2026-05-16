import { Component } from '@angular/core';

import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { LucideHouse, LucideCircleUserRound } from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmButton, HlmInput, LucideHouse, LucideCircleUserRound],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected readonly appTitle = 'ChiliFlow';
}
