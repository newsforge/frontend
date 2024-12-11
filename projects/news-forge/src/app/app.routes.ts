import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'auth/login',
    component: AuthComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
