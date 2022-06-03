import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.css'],
})
export class UploadInvoiceComponent implements OnInit {
  url: string = '';
  selectedFile!: File;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

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
    this.uploadService.upload(formData);
  }
}
