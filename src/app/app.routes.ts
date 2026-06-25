import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

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
    path: 'library',
    loadComponent: () => import('@views/library'),
    canActivate: [authGuard],
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('@views/artist'),
  },
  {
    path: '**',
    loadComponent: () => import('@views/not-found'),
  },
];
