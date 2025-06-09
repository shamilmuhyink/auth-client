import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
//   {
//     path: 'register',
//     loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
//   },
  {
    path: 'oauth-callback',
    loadComponent: () => import('./oauth-callback/oauth-callback.component').then(m => m.OAuthCallbackComponent)
  },
//   {
//     path: 'password-reset',
//     loadComponent: () => import('./password-reset/request-reset.component').then(m => m.RequestResetComponent)
//   },
//   {
//     path: 'password-reset/confirm',
//     loadComponent: () => import('./password-reset/confirm-reset.component').then(m => m.ConfirmResetComponent)
//   }
];