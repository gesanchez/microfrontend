import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'account',
        // In a real MFE, this would load the account remote
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
