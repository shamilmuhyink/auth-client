# Auth Client

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Project Overview

This application provides a complete authentication solution with the following features:

- User login and registration
- JWT token-based authentication
- Token refresh mechanism
- Password reset functionality
- Email verification
- Role-based access control
- OAuth2 social login integration

## Development server

To start a local development server, run:

```bash
ng serve
```

For server-side rendering (SSR) during development:

```bash
ng serve --ssr
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Structure

The authentication system consists of:

- **Services**:
  - `AuthService`: Core authentication functionality
  - `PlatformService`: Handles browser vs. server environment differences

- **Components**:
  - `LoginComponent`: User login form
  - `RegisterComponent`: User registration form
  - `ResetPasswordComponent`: Password reset functionality
  - `VerifyEmailComponent`: Email verification

- **Guards**:
  - `AuthGuard`: Protects routes requiring authentication

- **Interceptors**:
  - `AuthInterceptor`: Automatically adds authentication tokens to requests

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

For a production build with server-side rendering:

```bash
ng build --configuration production
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Environment Configuration

The application uses environment files to configure API endpoints:

- `environment.ts`: Development environment settings
- `environment.prod.ts`: Production environment settings

Make sure to update the `apiUrl` in these files to point to your authentication backend.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [JWT Authentication Best Practices](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
