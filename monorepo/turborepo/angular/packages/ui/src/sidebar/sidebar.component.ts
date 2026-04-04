import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

export interface SidebarItemConfig {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.item.component.html',
})
export class SidebarItemComponent {
  label = input.required<string>();
  icon = input.required<string>();
  isActive = input<boolean>(false);
  onClick = output<void>();
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  items = input.required<SidebarItemConfig[]>();
  currentPath = input.required<string>();
  navigate = output<string>();
}
