import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PlatformService } from './platform.service';
import {
  AuthResponse,
  LoginRequest,
  SignUpRequest,
  User,
  PasswordResetRequest,
  VerifyEmailRequest,
  JwtPayload,
  OAuth2CallbackRequest,
} from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;
  private refreshTokenTimeout: any;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private platformService: PlatformService
  ) {
    // Initialize with null values first
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.currentUserSubject = new BehaviorSubject<User | null>(null);

    // Only try to read from localStorage in browser environment
    const storedToken = this.platformService.getLocalStorageItem('token');
    const storedUser = this.platformService.getLocalStorageItem('currentUser');

    this.tokenSubject = new BehaviorSubject<string | null>(storedToken);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );

    // Start token refresh timer if user is logged in
    if (this.isLoggedIn()) {
      this.startRefreshTokenTimer();
    }

    this.token = this.tokenSubject.asObservable();
    this.currentUser = this.currentUserSubject.asObservable();

    this.checkAuthStatus();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  login(
    loginRequest: LoginRequest,
    rememberMe: boolean = false
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/signin`, loginRequest)
      .pipe(
        tap((response) => {
          this.setSession(response, rememberMe);
          this.loadCurrentUser();
          this.startRefreshTokenTimer();
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Login failed')
          );
        })
      );
  }

  register(signUpRequest: SignUpRequest): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/signup`, signUpRequest)
      .pipe(
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Registration failed')
          );
        })
      );
  }

  loadCurrentUser(): void {
    this.http.get<User>(`${environment.apiUrl}/user/me`).subscribe({
      next: (user) => {
        this.platformService.setLocalStorageItem(
          'currentUser',
          JSON.stringify(user)
        );
        this.currentUserSubject.next(user);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      },
    });
  }

  logout(): void {
    this.platformService.removeLocalStorageItem('access_token');
    this.platformService.removeLocalStorageItem('refresh_token');
    this.platformService.removeLocalStorageItem('expires_at');
    this.platformService.removeLocalStorageItem('token');
    this.platformService.removeLocalStorageItem('token_expiry');
    this.platformService.removeLocalStorageItem('currentUser');
    this.stopRefreshTokenTimer();
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private clearAuthData(): void {
    this.platformService.removeLocalStorageItem('token');
    this.platformService.removeLocalStorageItem('token_expiry');
    this.platformService.removeLocalStorageItem('refresh_token');
    this.platformService.removeLocalStorageItem('currentUser');
    this.stopRefreshTokenTimer();
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.tokenValue;
    if (!token) {
      return false;
    }

    const expiry = this.platformService.getLocalStorageItem('token_expiry');
    if (!expiry) {
      return false;
    }

    return new Date(expiry) > new Date();
  }

  private setSession(
    authResult: AuthResponse,
    rememberMe: boolean = false
  ): void {
    const token = authResult.accessToken;
    const refreshToken = authResult.refreshToken;

    try {
      // Get actual expiry from JWT token
      const expiresAt = this.getTokenExpirationDate(token);

      this.platformService.setLocalStorageItem('access_token', token);
      this.platformService.setLocalStorageItem(
        'expires_at',
        expiresAt.toISOString()
      );

      // Store refresh token if available
      if (refreshToken) {
        this.platformService.setLocalStorageItem('refresh_token', refreshToken);
      }

      this.tokenSubject.next(token);
    } catch (error) {
      console.error('Error setting session:', error);
      // Fallback to default expiry if token decoding fails
      const expiresAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      this.platformService.setLocalStorageItem('token', token);
      this.platformService.setLocalStorageItem(
        'token_expiry',
        expiresAt.toISOString()
      );
      this.tokenSubject.next(token);
    }
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/password/reset-request`, { email })
      .pipe(
        catchError((error) => {
          console.error('Password reset request error:', error);
          return throwError(
            () =>
              new Error(error.error?.message || 'Password reset request failed')
          );
        })
      );
  }

  confirmPasswordReset(request: PasswordResetRequest): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/password/reset-confirm`, request)
      .pipe(
        catchError((error) => {
          console.error('Password reset confirmation error:', error);
          return throwError(
            () =>
              new Error(
                error.error?.message || 'Password reset confirmation failed'
              )
          );
        })
      );
  }

  verifyEmail(request: VerifyEmailRequest): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/email/verify`, request)
      .pipe(
        catchError((error) => {
          console.error('Email verification error:', error);
          return throwError(
            () => new Error(error.error?.message || 'Email verification failed')
          );
        })
      );
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/email/resend-verification`, { email })
      .pipe(
        catchError((error) => {
          console.error('Resend verification email error:', error);
          return throwError(
            () =>
              new Error(
                error.error?.message || 'Resend verification email failed'
              )
          );
        })
      );
  }

  refreshToken(): Observable<AuthResponse> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        filter((token): token is string => token !== null),
        take(1),
        switchMap(() => this.performRefresh())
      );
    } else {
      this.refreshTokenInProgress = true;
      return this.performRefresh();
    }
  }

  private performRefresh(): Observable<AuthResponse> {
    const refreshToken =
      this.platformService.getLocalStorageItem('refresh_token');
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.setSession(response);
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(response.accessToken);
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(null);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  private getTokenExpirationDate(token: string): Date {
    const decodedToken: any = jwtDecode<JwtPayload>(token);

    if (!decodedToken.exp) {
      return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate;
  }

  private isTokenValid(token: string): boolean {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private startRefreshTokenTimer(): void {
    this.stopRefreshTokenTimer();

    const token = this.tokenValue;
    if (!token) return;

    try {
      const expires = this.getTokenExpirationDate(token);

      const timeout = expires.getTime() - Date.now() - 60 * 1000;

      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeout);
      } else {
        this.refreshToken().subscribe();
      }
    } catch (error) {
      console.error('Error starting refresh timer:', error);
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  private checkAuthStatus(): void {
    const token = this.platformService.getLocalStorageItem('access_token');
    const expiresAt = this.platformService.getLocalStorageItem('expires_at');

    if (token && expiresAt) {
      const isValid = new Date().getTime() < parseInt(expiresAt, 10);
      this.isAuthenticatedSubject.next(isValid);
    }
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return base64URLEncode(new Uint8Array(digest));
  }

  async initiateGoogleLogin(): Promise<void> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    this.platformService.setLocalStorageItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: environment.oauth.google.clientId,
      redirect_uri: environment.oauth.google.redirectUri,
      response_type: 'code',
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  handleOAuth2Callback(
    code: string,
    codeVerifier: string | null = null
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/oauth/callback`, {
        code,
        codeVerifier,
        redirectUri: environment.oauth.google.redirectUri,
      })
      .pipe(
        tap((response) => this.setSession(response)),
        catchError((error) => throwError(() => error))
      );
  }

  private handleAuthResponse(response: AuthResponse): void {
    const expiresAt = new Date().getTime() + response.expiresIn * 1000;
    this.platformService.setLocalStorageItem(
      'access_token',
      response.accessToken
    );
    this.platformService.setLocalStorageItem(
      'refresh_token',
      response.refreshToken
    );
    this.platformService.setLocalStorageItem(
      'expires_at',
      expiresAt.toString()
    );
    this.isAuthenticatedSubject.next(true);
  }
}

function base64URLEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
