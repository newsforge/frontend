import { Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
