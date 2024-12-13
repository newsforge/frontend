import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const AuthGuard = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => {
      const currentUrl = route.url.join('/');
      if (currentUrl == 'auth/login') {
        if (user) {
          router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      } else if (user) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
