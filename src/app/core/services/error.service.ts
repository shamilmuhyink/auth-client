import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  handleAuthError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Authentication failed';

    switch (error.status) {
      case 401:
        errorMessage = 'Invalid credentials';
        break;
      case 403:
        errorMessage = 'Access denied';
        break;
      case 404:
        errorMessage = 'User not found';
        break;
      default:
        errorMessage = error.error?.message || errorMessage;
    }

    return throwError(() => new Error(errorMessage));
  }
}