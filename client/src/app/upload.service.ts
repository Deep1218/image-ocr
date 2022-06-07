import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiUrl = 'http://localhost:3000';
  currentIndex = 0;
  fileData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private route: Router) {
    this.currentIndex = parseInt(localStorage.getItem('index') || '0');
    if (this.currentIndex < 0) {
      console.log(this.currentIndex, 'something went wrong');
      this.currentIndex = 0;
    }
  }

  upload(formData: any) {
    this.http.post(`${this.apiUrl}/upload`, formData).subscribe((data) => {
      this.fileData.next(data);
      this.route.navigate(['/invoice-detail']);
    });
  }

  saveCsv(updatedObj: any) {
    this.http
      .post(`${this.apiUrl}/save/${this.currentIndex}`, { data: updatedObj })
      .subscribe((data) => {
        console.log(data);
      });
  }

  getData() {
    localStorage.setItem('index', this.currentIndex.toString());
    this.currentIndex++;
    this.http
      .get(`${this.apiUrl}/get-data/${this.currentIndex}`)
      .subscribe((data) => {
        this.fileData.next(data);
      });
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }
}
