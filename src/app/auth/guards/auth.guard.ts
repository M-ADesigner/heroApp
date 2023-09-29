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

// No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return isAuthenticated(); // Llama a la función checkAuthStatus
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return isAuthenticated(); // Llama a la función checkAuthStatus
};

import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, take, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class authGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   public checkAuthStatus(): boolean | Observable<boolean> {
//     return this.authService.checkAuthentication().pipe(
//       tap((isAuthenticated) => {
//         if (!isAuthenticated) this.router.navigateByUrl('/auth/login');
//       })
//     );
//   }
// }

// const isAuthenticated = ():
//   | boolean
//   | UrlTree
//   | Observable<boolean | UrlTree>
//   | Promise<boolean | UrlTree> => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.checkAuthentication().pipe(
//     tap((isAuthenticated) => {
//       if (!isAuthenticated) router.navigateByUrl('/auth/login');
//     })
//   );
// };

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
        if (!isAuthenticated) router.navigateByUrl('/auth/login');
      })
    );
  }

  // Handle the case where router is undefined (e.g., not provided)
  return false; // You can return a default value or handle this case as needed.
};
