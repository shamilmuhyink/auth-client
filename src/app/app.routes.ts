import { Routes } from '@angular/router';
import { OAuthCallbackComponent } from './components/oauth-callback/oauth-callback.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent),
    title: 'Sign Up'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    // canActivate: [authGuard],
    title: 'Home'
  },
  {
    path: 'auth/callback',
    component: OAuthCallbackComponent,
    title: 'Authentication'
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  //   canActivate: [authGuard],
  //   title: 'Dashboard'
  // },
  { path: '**', redirectTo: 'login' }
];
