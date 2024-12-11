import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CriteriaForm, SettingsForm } from '../core/models/settings.model';
import { SettingsService } from '../core/services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  template: ` <section>
      <h1>Settings</h1>
      @for (sourceForm of form.controls; track $index) {
      <form
        [formGroup]="sourceForm"
        style="background: #fafafa; padding: 16px; margin: 16px"
      >
        <h3>Source Form {{ $index + 1 }}</h3>
        <input
          placeholder="Source Url {{ $index }}"
          type="text"
          formControlName="source"
        />

        <h3>Source Criteria</h3>

        <div style="display: flex;">
          @for (criteriaForm of sourceForm.controls.criteria.controls; track
          $index) {
          <form [formGroup]="criteriaForm">
            <input
              formControlName="criteria"
              type="text"
              placeholder="Criteria {{ $index }}"
            />
          </form>
          }
          <button (click)="addCriteria(sourceForm.controls.criteria)">
            Add Criteria
          </button>
        </div>
      </form>
      }
    </section>

    <section style="margin-top: 20px;">
      <button (click)="addSource()">Add Source</button>
      <button (click)="submit()">Send</button>
    </section>`,
})
export class SettingsComponent implements OnInit {
  form!: FormArray<FormGroup<SettingsForm>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.array<FormGroup>([]);
    this.addSource();
  }

  addSource() {
    this.form.controls.push(
      this.fb.group({
        source: new FormControl(''),
        criteria: new FormArray([
          new FormGroup({
            criteria: new FormControl(''),
          }),
        ]),
      })
    );
  }

  addCriteria(criteriaForm: FormArray<FormGroup<CriteriaForm>>) {
    criteriaForm.push(
      new FormGroup({
        criteria: new FormControl(''),
      })
    );
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.settingsService
      .sendSettings(this.form.getRawValue() as any)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
