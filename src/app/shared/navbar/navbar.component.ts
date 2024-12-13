import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatToolbar, MatButton, CommonModule],
  template: `<mat-toolbar>
    <div class="container m-auto flex">
      <button routerLink="/" mat-button>Feed</button>
      <button routerLink="/settings" mat-button>Settings</button>

      <div class="flex-grow"></div>

      <div class="flex items-center" *ngIf="authService.user$ | async as user">
        <img
          class="rounded-full mr-4"
          [src]="user.photoURL"
          alt="User profile"
          width="30"
        />
        <div class="text-sm">{{ user.displayName }}</div>
      </div>
    </div>
  </mat-toolbar> `,
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
