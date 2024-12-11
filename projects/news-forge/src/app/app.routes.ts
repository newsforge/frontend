import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
