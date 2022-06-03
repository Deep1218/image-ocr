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
  @ViewChild('selectedOption') selectedOption!: ElementRef;
  fileData: any;

  optionsList = [
    'Invoice Number',
    'Senders Name',
    'Senders Address',
    'Phone Number',
    'Recievers Name',
    'Recievers Address',
    'Invoice Date',
    'Total Amount',
    'Position 1',
  ];

  currentOptData = '';
  optionsData: any = {};

  serverUrl = 'http://localhost:3000/';
  constructor(private uploadService: UploadService) {}
  boxObj: any[] = [];
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.uploadService.fileData.subscribe((data: any) => {
      if (!data) return;
      const canvasSize = {
        width: 750,
        height: 1050,
      };
      this.fileData = data;
      let fileUrl = this.serverUrl + data.invoicePath.replace('\\', '/');
      console.log(fileUrl);
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      var newImg = new Image();

      newImg.onload = () => {
        var imgHeight = newImg.height;
        var imgWidth = newImg.width;
        canvas.style.backgroundImage = 'url(' + fileUrl + ')';
        const boxes = data.data;
        console.log(boxes);

        for (let i = 0; i < boxes.length; i++) {
          const element = boxes[i];
          if (element.text == '' || element.text == '—') continue;
          let text = element.text;
          let left = (canvasSize.width * element.left) / imgWidth;
          let top = (canvasSize.height * element.top) / imgHeight;
          let boxWidth = (canvasSize.width * element.width) / imgWidth;
          let boxHeight = (canvasSize.height * element.height) / imgHeight;
          this.boxObj.push({ text, top, left, boxWidth, boxHeight });
          ctx.beginPath();
          ctx.rect(left, top, boxWidth, boxHeight);
          ctx.stroke();
        }
      };

      newImg.src = fileUrl;
    });
  }

  selectBox(e: any) {
    const clickX = e.offsetX;
    const clickY = e.offsetY;
    for (let i = 0; i < this.boxObj.length; i++) {
      const element = this.boxObj[i];
      if (
        clickX > element.left &&
        clickX <= element.left + element.boxWidth &&
        clickY > element.top &&
        clickY <= element.top + element.boxHeight
      ) {
        console.log(element);
        this.currentOptData += element.text + '\n';
      }
    }
  }

  onAdd() {
    this.optionsData[this.selectedOption.nativeElement.value] =
      this.currentOptData;
    console.log(this.optionsData);
  }
}
