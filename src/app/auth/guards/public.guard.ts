import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

// No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return isAuthenticated(); // Llama a la función checkAuthStatus
};

export const publicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return isAuthenticated(); // Llama a la función checkAuthStatus
};

const isAuthenticated = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (router) {
    return authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) router.navigateByUrl('./');
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  }

  // Handle the case where router is undefined (e.g., not provided)
  return false; // You can return a default value or handle this case as needed.
};
