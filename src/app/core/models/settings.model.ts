import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CriteriaForm {
  criteria: FormControl<string | null>;
}

export interface SettingsForm {
  source: FormControl<string | null>;
  criteria: FormArray<FormGroup<CriteriaForm>>;
}

export interface Criteria {
  criteria: string | null;
}

export interface Settings {
  source: string | null;
  criteria: Criteria[];
}
