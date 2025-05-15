import { Routes } from '@angular/router';
import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Server-side routes configuration
 * This file is specifically for Angular Universal (Server-Side Rendering)
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  // Catch-all route for 404
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
