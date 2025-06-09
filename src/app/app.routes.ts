import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/header/header.component').then((m) => m.HeaderComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./features/user-profile/profile.routes').then(m => m.PROFILE_ROUTES)
      // }
    ],
  },
];
