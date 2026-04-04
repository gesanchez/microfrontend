import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <code [class]="className()"><ng-content></ng-content></code>
  `
})
export class CodeComponent {
  className = input<string>('');
}
