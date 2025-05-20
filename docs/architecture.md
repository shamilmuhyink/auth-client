# Application Architecture

## Overview

The Auth Client is built using Angular 17 with a focus on modern practices:

- Standalone Components
- Signal-based State Management
- Lazy Loading
- OAuth2/OIDC Authentication

## Core Technologies

- Angular 17
- RxJS
- Bootstrap 5
- SCSS

## Project Structure

```
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── core/           # Core functionality
│   ├── features/       # Feature modules
│   ├── guards/         # Route guards
│   ├── interceptors/   # HTTP interceptors
│   ├── models/         # TypeScript interfaces
│   ├── services/       # Application services
│   └── shared/         # Shared modules
├── assets/            # Static assets
├── environments/      # Environment configurations
└── styles/           # Global styles
```