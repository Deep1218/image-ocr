import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiUrl = 'http://localhost:3000';
  fileData = new Subject();

  constructor(private http: HttpClient, private route: Router) {}
  upload(formData: any) {
    this.http.post(`${this.apiUrl}/upload`, formData).subscribe((data) => {
      console.log(data);
      this.fileData.next(data);
      this.route.navigate(['/invoice-detail']);
    });
  }
}
