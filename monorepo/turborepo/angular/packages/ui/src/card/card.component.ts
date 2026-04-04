import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ' + className()">
      <div *ngIf="hasHeader" class="px-6 py-4 border-b border-gray-100 font-semibold text-deep-space">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="px-6 py-4">
        <ng-content></ng-content>
      </div>
      <div *ngIf="hasFooter" class="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CardComponent {
  className = input<string>('');
  hasHeader = input<boolean>(false);
  hasFooter = input<boolean>(false);
}
