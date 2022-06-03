import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  url: string = './assets/invoice.jpg';
  selectedFile!: File;

  previewFile(e: any) {
    console.log(e.target.files[0]);
    if (e.target.files) {
      this.selectedFile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  onSubmit() {
    console.log(this.selectedFile);
    const formData = new FormData();
    formData.append('invoice', this.selectedFile);
  }
}
