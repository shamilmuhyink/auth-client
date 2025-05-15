import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Server-side bootstrap function for Angular Universal (SSR).
 * This function is used when rendering the application on the server.
 * 
 * The server config includes special providers needed for server-side rendering.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
