import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsForm } from '../core/models/settings.model';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-source-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: ` <h1 mat-dialog-title>Add a new source</h1>

    <div mat-dialog-content>
      <form [formGroup]="form" class="my-6 flex-col">
        <mat-form-field class="w-full mb-5">
          <input
            matInput
            placeholder="RSS Address"
            type="text"
            formControlName="source"
          />
          <mat-hint>Find the rss feed of your favorite news media</mat-hint>
        </mat-form-field>

        <mat-form-field class="w-full">
          <input
            matInput
            placeholder="Criteria"
            type="text"
            formControlName="criteria"
          />
        </mat-form-field>
      </form>
    </div>

    <div mat-dialog-actions class="flex flex-row-reverse">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button class="mr-4" (click)="submit()">
        Add Source
      </button>
    </div>`,
})
export class SourceDialogComponent implements OnInit {
  form!: FormGroup<SettingsForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<SourceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      source: new FormControl('', [Validators.required]),
      criteria: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
