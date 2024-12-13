import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <div>
      <h1 class="text-3xl">Account</h1>
      <button (click)="signInWithGoogle()">Login with Google</button>
      <button (click)="logout()">Logout</button>

      <div *ngIf="auth.user$ | async as user">
        <p>Welcome, {{ user.displayName }}!</p>
        <img [src]="user.photoURL" alt="User profile" width="50" />
      </div>
    </div>
  `,
})
export class LoginComponent {
  protected auth = inject(AuthService);

  async signInWithGoogle() {
    try {
      await this.auth.googleLogin();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
