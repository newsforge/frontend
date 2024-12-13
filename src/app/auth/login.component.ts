import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatButton],
  template: ` <div class="h-screen flex items-center justify-center">
    <div class="flex flex-col">
      <p class="mb-3 font-bold">Please log in to proceed</p>
      <button mat-raised-button (click)="signInWithGoogle()">
        Login with Google
      </button>
    </div>
  </div>`,
})
export class LoginComponent {
  protected auth = inject(AuthService);
  constructor(private readonly router: Router) {}

  async signInWithGoogle() {
    try {
      await this.auth.googleLogin();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
