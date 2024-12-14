import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../core/services/settings.service';
import { SourceDialogComponent } from './source-dialog.component';
import {
  Settings,
  NewsSourceDTO,
  PreferenceDTO,
} from '../core/models/settings.model';

@Component({
  selector: 'app-settings',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <section>
      <h1 class="text-3xl">Settings</h1>
      <p class="text-neutral-400">
        Choose your news source and the way you want to filter them
      </p>

      <h1 class="text-2xl mt-6">Enabled sources</h1>
      <p class="text-neutral-400">List of the your news sources</p>

      <div class="mt-6">
        @for (source of data?.sources; track $index) {
        <div
          class="p-5 bg-neutral-50 bg-opacity-10 rounded-lg gap-2 mb-6 flex justify-between"
        >
          <div>
            <div><strong class="mr-3">Source:</strong> {{ source.source }}</div>
            <div>
              <strong class="mr-3">Filter Criteria:</strong>
              {{ source.criteria }}
            </div>
          </div>
          <div>
            <button mat-icon-button (click)="onDelete(source)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
        }
        <button class="my-5" mat-stroked-button (click)="onAdd()">
          <mat-icon>add</mat-icon>
          <span>New source</span>
        </button>
      </div>
    </section>
  `,
})
export class SettingsComponent implements OnInit {
  data?: PreferenceDTO;

  constructor(
    private readonly dialog: MatDialog,
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings().subscribe({
      next: (result) => {
        this.data = result;
      },
      error: (e) => {
        console.error('There was an error', e);
      },
    });
  }

  onAdd(): void {
    const ref = this.dialog.open(SourceDialogComponent, {
      width: '400px',
    });
    ref.afterClosed().subscribe((result: Settings[]) => {
      if (result) {
        this.addSource(result);
      }
    });
  }

  onDelete(source: NewsSourceDTO) {
    this.settingsService.deleteSources(source).subscribe(() => {
      this.getSettings();
    });
  }

  private addSource(result: Settings[]) {
    const newSource: NewsSourceDTO = {
      source: result[0].source ?? '',
      criteria: result[0].criteria.map((c) => c.criteria ?? '') ?? [],
    };

    this.data?.sources?.push(newSource);

    if (!this.data) {
      return;
    }

    this.settingsService
      .updateSources(this.data.sources ?? [])
      .subscribe(() => {
        this.getSettings();
      });
  }
}
