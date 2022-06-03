import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  upload(formData: any) {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
