import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { WrapperComponent } from './shared/wrapper/wrapper.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'news-forge';
}
