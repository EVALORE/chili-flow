import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'discover' },
  {
    path: 'discover',
    loadComponent: () => import('@views/discover'),
  },
  {
    path: 'album/:id',
    loadComponent: () => import('@views/album'),
  },
  {
    path: '**',
    loadComponent: () => import('@views/not-found'),
  },
];
