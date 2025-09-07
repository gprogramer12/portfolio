import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing').then((c) => c.Landing),
  },
  {
    path: 'my-work',
    loadComponent: () => import('./my-work/my-work').then((c) => c.MyWork),
  },
];
