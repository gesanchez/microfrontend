import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  user = input<User>();
  currentLang = input<string>('en');
  languageChange = output<string>();
}
