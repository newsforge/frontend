import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-component',
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>

    <div class="mat-app-dark-theme">
      <div class="container m-auto py-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class WrapperComponent {}
