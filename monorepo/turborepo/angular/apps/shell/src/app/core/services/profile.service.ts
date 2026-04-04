import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private readonly API_BASE_URL = 'http://localhost:5005/api';

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_BASE_URL}/profile`);
  }
}
