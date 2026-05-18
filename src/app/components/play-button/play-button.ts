import { Component, input } from '@angular/core';
import { HlmButton, ButtonVariants } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlay, lucidePause } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-play-button',
  imports: [HlmButton, NgIcon, HlmIcon],
  templateUrl: './play-button.html',
  providers: [provideIcons({ lucidePlay, lucidePause })],
})
export class PlayButton {
  variant = input<ButtonVariants['variant']>('ghost');

  customClass = input<string>('');

  isPlaying = input<boolean>(false);

  ariaLabel = input<string>('Play track');
}
