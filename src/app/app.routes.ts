import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './auth/login.component';
import { WrapperComponent } from './shared/wrapper/wrapper.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FeedComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
