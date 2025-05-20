# Authentication

## Authentication Flows

### Password Authentication
1. User enters credentials
2. Client validates input
3. Credentials sent to authentication endpoint
4. JWT token received and stored
5. User redirected to dashboard

### OAuth2 Authentication
1. User clicks OAuth provider button
2. PKCE flow initiated
3. User redirected to provider
4. Authorization code received
5. Token exchange performed
6. JWT token stored

## Security Considerations

- PKCE flow for OAuth2
- JWT token storage in HTTP-only cookies
- CSRF protection
- XSS prevention
- Rate limiting