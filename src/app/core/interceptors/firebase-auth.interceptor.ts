import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { from, switchMap, catchError, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';

export const firebaseAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const afAuth = inject(AngularFireAuth);

  if (req.url.includes('firebaseapp.com') || req.url.includes('firebase')) {
    return next(req);
  }

  return afAuth.authState.pipe(
    switchMap((user) => {
      if (!user) {
        return next(req);
      }

      return from(user.getIdToken()).pipe(
        switchMap((token) => {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
          return next(authReq);
        })
      );
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized request:', error);
      }
      return throwError(() => error);
    })
  );
};
