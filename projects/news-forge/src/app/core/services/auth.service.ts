import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, inject } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly afAuth = inject(AngularFireAuth);
  user$: Observable<firebase.User | null>;

  constructor() {
    this.user$ = this.afAuth.authState;
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      return result;
    } catch (error) {
      console.error('Error during Google sign in:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  }
}
