import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
          });
        }

        const requiredRoles = route.data['roles'] as Array<string>;
        if (requiredRoles) {
          const userRoles = this.authService.currentUserValue?.roles || [];
          const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
          
          if (!hasRequiredRole) {
            return this.router.createUrlTree(['/unauthorized']);
          }
        }

        return true;
      })
    );
  }
}
