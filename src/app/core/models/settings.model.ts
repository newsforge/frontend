import { FormControl } from '@angular/forms';

export interface SettingsForm {
  source: FormControl<string | null>;
  criteria: FormControl<string | null>;
}

export interface NewsSourceDTO {
  source: string;
  criteria: string[];
}

export interface PreferenceDTO {
  id?: number;
  userId?: string;
  apiKey?: string;
  sources?: NewsSourceDTO[];
}
