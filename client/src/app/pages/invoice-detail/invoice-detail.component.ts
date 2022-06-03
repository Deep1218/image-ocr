import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('imgCanvas') canvas!: ElementRef;
  invoicePath = 'http://localhost:3000/uploads/invoice.jpg';
  fileData: any;
  constructor(private uploadService: UploadService) {
    this.uploadService.fileData.subscribe((data) => {
      this.fileData = data;
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 700;

    var newImg = new Image();

    newImg.onload = () => {
      var height = newImg.height;
      var width = newImg.width;
      canvas.style.backgroundImage = 'url(' + this.invoicePath + ')';
    };

    newImg.src = this.invoicePath;

    ctx.beginPath();
    ctx.rect(100, 100, 200, 10);
    ctx.stroke();
  }
}
