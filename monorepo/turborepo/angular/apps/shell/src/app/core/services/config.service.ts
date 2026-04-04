import { Injectable } from '@angular/core';

export interface MfeConfig {
  name: string;
  url: string;
  template: string;
  module: string;
  route: string;
  icon?: string;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: MfeConfig[] = [
    {
      name: 'dashboard',
      url: 'http://localhost:4201',
      template: 'main',
      module: './RemoteEntry',
      route: '/dashboard',
      icon: 'LayoutDashboard',
      label: 'Dashboard'
    },
    {
      name: 'account',
      url: 'http://localhost:4202',
      template: 'main',
      module: './RemoteEntry',
      route: '/account',
      icon: 'Users',
      label: 'Accounts'
    }
  ];

  get mfes(): MfeConfig[] {
    // In a real scenario, this would come from an external configuration or window object during SSR hydration
    return this.config;
  }
}
