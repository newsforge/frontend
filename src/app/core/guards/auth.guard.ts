import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const AuthGuard = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => {
      const currentUrl = route.url.join('/');
      console.log(currentUrl);
      if (currentUrl == 'auth/login' && user) {
        router.navigate(['/']);
        return false;
      }

      if (user) return true;
      router.navigate(['/auth/login']);
      return false;
    })
  );
};
