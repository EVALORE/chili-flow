import { Component, input } from '@angular/core';
import { HlmButtonImports, ButtonVariants } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlay } from '@ng-icons/heroicons/outline';
import { heroPause } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-play-button',
  imports: [HlmButtonImports, NgIcon],
  templateUrl: './play-button.html',
  providers: [provideIcons({ heroPlay, heroPause })],
})
export class PlayButton {
  protected readonly PlayIcon = 'heroPlay';
  protected readonly PauseIcon = 'heroPause';

  variant = input<ButtonVariants['variant']>('ghost');

  customClass = input<string>('');

  isPlaying = input<boolean>(false);
}
