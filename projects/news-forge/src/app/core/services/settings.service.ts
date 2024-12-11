import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './env';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private readonly http: HttpClient) {}

  sendSettings(data: Settings) {
    return this.http.post(environment.url + '/settings', data);
  }
}
