import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideDynamicIcon,
  LucideUser,
  LucideMenu,
  LucideCircleQuestionMark,
  LucideSettings,
  LucideLogOut,
  LucideIconBase,
  LucideUsers,
  LucideLayoutDashboard,
} from '@lucide/angular';
import { cn } from '../lib/utils';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, LucideUser, LucideMenu, LucideCircleQuestionMark],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  name = input.required<string>();
  size = input<number | string>(24);
  color = input<string>('currentColor');
  strokeWidth = input<number | string>(2);
  className = input<string>('');

  protected readonly cn = cn;

  get iconResolved(): typeof LucideIconBase | string {
    const map: Record<string, typeof LucideIconBase> = {
      'Menu': LucideMenu,
      'User': LucideUser,
      'Settings': LucideSettings,
      'LogOut': LucideLogOut,
      'LayoutDashboard': LucideUsers,
      'Users': LucideLayoutDashboard,
      'CircleQuestionMark': LucideCircleQuestionMark // Ajusta según el nombre que importaste
    };
    return map[this.name()] || this.name();
  }
}
