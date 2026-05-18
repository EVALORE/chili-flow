import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-track-filter',
  templateUrl: './track-filter.html',
  imports: [HlmButtonImports, HlmIcon, HlmInputImports, NgIcon],
  providers: [provideIcons({ lucideSearch, lucideX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackFilter {
  query = input('');

  queryChanged = output<string>();
  cleared = output<void>();

  protected readonly hasFilter = computed(() => this.query().trim().length > 0);

  protected onFilterInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.queryChanged.emit(inputElement.value);
  }

  protected clearFilter(): void {
    this.cleared.emit();
  }
}
