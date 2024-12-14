import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NewsSourceDTO, PreferenceDTO } from '../models/settings.model';
import { environment } from './env';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<PreferenceDTO> {
    return this.http.get(environment.url + '/preferences');
  }

  updateSources(sources: NewsSourceDTO[]) {
    return this.http.put(environment.url + '/preferences/sources', {
      sources,
    });
  }

  deleteSources(sources: NewsSourceDTO) {
    return this.http.delete(
      environment.url + '/preferences/sources/' + sources.source
    );
  }
}
