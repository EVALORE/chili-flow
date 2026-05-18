import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | string): string {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    const minutes = Math.floor(numValue / 60);
    const seconds = numValue % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
