import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap the Angular application using the standalone component approach.
 * This is the recommended way to bootstrap Angular applications in v19+.
 * 
 * The AppComponent serves as the root component, and appConfig provides
 * all necessary providers including routing, HTTP client, and SSR hydration.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error('Application bootstrap error:', err));
