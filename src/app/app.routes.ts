import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { AuthLayout, AppLayout } from './layouts';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'discover' },
      { path: 'discover', loadComponent: () => import('@views/discover') },
      { path: 'album/:id', loadComponent: () => import('@views/album') },
      { path: 'library', loadComponent: () => import('@views/library'), canActivate: [authGuard] },
      { path: 'artist/:id', loadComponent: () => import('@views/artist') },
    ],
  },

  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadComponent: () => import('@views/login') },
      { path: 'register', loadComponent: () => import('@views/register') },
      { path: '**', redirectTo: 'login' },
    ],
  },
  { path: '**', loadComponent: () => import('@views/not-found') },
];
