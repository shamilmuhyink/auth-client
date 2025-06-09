import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
];
