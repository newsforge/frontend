import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};
