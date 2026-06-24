import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import AuthorizationLayout from '@views/authorization';

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
    path: 'auth',
    component: AuthorizationLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadComponent: () => import('@views/authorization/login'),
      },
      {
        path: 'register',
        loadComponent: () => import('@views/authorization/register'),
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@views/not-found'),
  },
];
