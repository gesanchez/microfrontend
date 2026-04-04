import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'flex flex-col ' + className()">
      <h3 class="text-sm font-medium text-blue-green mb-4">{{ title() }}</h3>
      <div class="flex-1 min-h-[200px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ChartContainerComponent {
  title = input.required<string>();
  className = input<string>('');
}

@Component({
  selector: 'app-simple-stat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col">
      <span class="text-xs text-gray-500 uppercase tracking-wider">{{ label() }}</span>
      <span class="text-2xl font-bold text-deep-space mt-1">{{ value() }}</span>
      <span *ngIf="trend()" [class]="'text-xs font-medium mt-1 ' + trendColor()">
        {{ trendIcon() }} {{ trend() }}
      </span>
    </div>
  `
})
export class SimpleStatComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  trend = input<string>();
  trendType = input<'up' | 'down' | 'neutral'>('up');

  trendColor() {
    switch (this.trendType()) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  }

  trendIcon() {
    switch (this.trendType()) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  }
}
