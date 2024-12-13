import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatToolbar, MatButton, CommonModule, MatIcon],
  template: `
    <mat-toolbar>
      <div class="container m-auto flex items-center">
        <button routerLink="/" mat-button>
          <mat-icon>feed</mat-icon>
          <span>Feed</span>
        </button>
        <button routerLink="/settings" mat-button>
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>

        <div class="flex-grow"></div>

        <div
          class="flex items-center"
          *ngIf="authService.user$ | async as user"
        >
          <img
            class="rounded-full mr-4"
            [src]="user.photoURL"
            alt="User profile"
            width="30"
          />
          <div class="text-sm">{{ user.displayName }}</div>
          <button class="ml-6" mat-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </div>
      </div>
    </mat-toolbar>
  `,
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  async logout() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
