# Auth Client 🔐

[![Angular](https://img.shields.io/badge/Angular-17-dd0031.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern authentication client built with Angular 17, featuring comprehensive user authentication and authorization capabilities.

## 🚀 Features

- **User Authentication**
  - Email/Password login
  - Social login (Google, GitHub)
  - JWT token management
  - Automatic token refresh
  - Session management

- **User Management**
  - Registration with email verification
  - Password reset/recovery
  - Profile management
  - Role-based access control

- **Security**
  - HTTP interceptors for auth headers
  - Route guards
  - CSRF protection
  - Secure token storage

## 📋 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (v17 or later)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/shamilmuhyink/auth-client.git
cd auth-client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

4. Start development server:
```bash
ng serve
```

## 📚 Documentation

Detailed documentation is available in the [docs](./docs) directory:

- [Getting Started](./docs/getting-started.md)
- [Architecture Overview](./docs/architecture.md)
- [Component Documentation](./docs/components/README.md)
- [API Reference](./docs/api-reference.md)
- [Development Guide](./docs/development-guide.md)

## 🏗️ Project Structure

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

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run e2e tests:
```bash
ng e2e
```

## 🚀 Deployment

Build for production:
```bash
ng build --configuration production
```

For SSR deployment:
```bash
ng build --configuration production
ng run auth-client:server:production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/shamilmuhyink)

## 🙏 Acknowledgments

- [Angular Team](https://angular.io/)
- [Angular CLI](https://cli.angular.io/)

## 📞 Support

For support, email shamilmuhyin@gmail.com or create an issue in the repository.
