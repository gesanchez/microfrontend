import { Component, signal, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { NavbarComponent, User } from '@repo/ui/navbar/navbar.component';
import { SidebarComponent, SidebarItemConfig } from '@repo/ui/sidebar/sidebar.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService, MfeConfig } from '../../core/services/config.service';
import { ProfileService, UserProfile } from '../../core/services/profile.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
      <app-navbar 
        [user]="profile()" 
        [currentLang]="translate.currentLang"
        (languageChange)="handleLanguageChange($event)"
      ></app-navbar>
      <div class="flex flex-1">
        <app-sidebar 
          [items]="sidebarItems()" 
          [currentPath]="currentPath()"
          (navigate)="handleNavigate($event)"
        ></app-sidebar>
        <main class="flex-1 p-8 overflow-auto">
          <div class="max-w-7xl mx-auto">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent implements OnInit {
  translate = inject(TranslateService);
  router = inject(Router);
  configService = inject(ConfigService);
  profileService = inject(ProfileService);

  profile = signal<User | undefined>(undefined);
  sidebarItems = signal<SidebarItemConfig[]>([]);
  currentPath = signal<string>(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath.set(event.urlAfterRedirects);
    });

    effect(() => {
      // Map MFEs to sidebar items
      const items = this.configService.mfes
        .filter((m: MfeConfig) => m.template === 'main')
        .map((m: MfeConfig) => ({
          label: m.label || m.name,
          icon: m.icon || 'LayoutDashboard',
          path: m.route
        }));
      
      this.sidebarItems.set(items as SidebarItemConfig[]);
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data: UserProfile) => {
         // Transform to match navbar User type if needed
         this.profile.set({
           name: data.name,
           email: data.email,
           avatar: data.avatar || ''
         });
      },
      error: (err: unknown) => console.error('Failed to load profile', err)
    });
  }

  handleLanguageChange(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  handleNavigate(path: string) {
    this.router.navigate([path]);
  }
}
