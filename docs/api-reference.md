# API Reference

## Models

### LoginRequest
```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

### SignUpRequest
```typescript
interface SignUpRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}
```

### AuthResponse
```typescript
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
```

## Endpoints

### Authentication

- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/refresh-token`
- GET `/api/auth/verify-email`
- POST `/api/auth/reset-password`