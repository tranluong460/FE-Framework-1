import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuthorization().pipe(
      map((isAuthorized) => {
        if (!isAuthorized) {
          this.router.navigate(['unauthorized']);
        }
        return isAuthorized;
      }),
      catchError((error) => {
        console.error(error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

  private checkAuthorization(): Observable<boolean> {
    const userData: any = localStorage.getItem('user');

    if (!userData) {
      return of(false);
    }

    try {
      const user = JSON.parse(userData);
      return of(user.role === 'Admin');
    } catch (error) {
      console.log(error);

      return of(false);
    }
  }
}
