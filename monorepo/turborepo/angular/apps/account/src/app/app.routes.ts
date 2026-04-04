import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/account-list/account-list.component').then(m => m.AccountListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/create-account/create-account.component').then(m => m.CreateAccountComponent)
  }
];
