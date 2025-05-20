# Development Guide

## Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write unit tests for components
- Document public APIs

## Git Workflow

1. Create feature branch
2. Implement changes
3. Write tests
4. Submit PR
5. Code review
6. Merge to main

## Environment Setup

### Development
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### Production
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api'
};
```