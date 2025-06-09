export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  roles: string[];
  emailVerified?: boolean; // Added to track email verification status
}

// New interfaces for password reset
export interface PasswordResetRequest {
  token: string;
  email: string;
  newPassword: string;
}

// New interface for email verification
export interface VerifyEmailRequest {
  token: string;
  email: string;
}

// New interface for JWT token payload
export interface JwtPayload {
  sub: string; // subject (user id)
  iat: number; // issued at
  exp: number; // expiration time
  roles: string[];
  email: string;
  username: string;
}

export interface OAuth2Config {
  clientId: string;
  redirectUri: string;
  scope: string[];
  responseType: string;
  authorizationEndpoint: string;
}

export interface OAuth2Response {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token?: string;
}

export interface OAuth2CallbackRequest {
  code: string;
  codeVerifier: string;
  redirectUri: string;
}
