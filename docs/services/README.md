# Services

## Authentication Service
- Path: `src/app/services/auth.service.ts`
- Purpose: Manages authentication state and operations
- Features:
  - JWT token management
  - OAuth2 flows
  - User session handling
  - Password reset
  - Email verification

## API Documentation

### Login
```typescript
login(request: LoginRequest): Observable<AuthResponse>
```

### Register
```typescript
register(request: SignUpRequest): Observable<ApiResponse>
```

### OAuth2 Authentication
```typescript
initiateGoogleLogin(): Promise<void>
initiateGithubLogin(): Promise<void>
```