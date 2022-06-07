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
  serverUrl = 'http://localhost:3000/';
  error!: string;

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
  selectedOption = this.optionsList[0];

  boxes: any[] = [];
  config = {
    canvas_width: 750,
    canvas_height: 1050,
    img_width: 750,
    img_height: 1050,
  };

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadService.getData();
  }
  ngAfterViewInit(): void {
    this.uploadService.fileData.subscribe((data: any) => {
      if (!data) return;
      console.log(data);
      let fileUrl = this.serverUrl + data.imgFilePath.replace('\\', '/');
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');
      canvas.width = this.config.canvas_width;
      canvas.height = this.config.canvas_height;

      var newImg = new Image();
      newImg.onload = () => {
        this.config.img_width = newImg.width;
        this.config.img_height = newImg.height;
        canvas.style.backgroundImage = 'url(' + fileUrl + ')';
        this.boxes = data.data
          .map((box: any) => {
            return { ...box, tag: 'O' };
          })
          .filter((box: any) => box.text != '' && box.text != '—');

        // Draw all boxes on image
        for (let i = 0; i < this.boxes.length; i++) {
          const element = this.boxes[i];
          const { left, top, width, height } = this.sizesConvert(element);
          ctx.beginPath();
          ctx.strokeStyle = '#FF0000';
          ctx.rect(left, top, width, height);
          ctx.stroke();
        }
      };
      newImg.src = fileUrl;
    });
  }

  selectBox(e: any) {
    const clickX = e.offsetX;
    const clickY = e.offsetY;
    for (let i = 0; i < this.boxes.length; i++) {
      const element = this.boxes[i];
      const { left, top, width, height } = this.sizesConvert(element);
      if (
        clickX > left &&
        clickX <= left + width &&
        clickY > top &&
        clickY <= top + height
      ) {
        console.log(element);
        this.addTagAtIndex(i);
      }
    }
  }

  onOptionChange(e: any) {
    this.selectedOption = e.target.value;
  }

  onSave() {
    console.log('onSave', this.boxes);
    this.uploadService.saveCsv(this.boxes);
  }
  onNext() {
    this.uploadService.getData();
  }

  removeBox(index: number) {
    var currentTag = this.boxes[index].tag;
    if (currentTag.startsWith('I') || currentTag.startsWith('S')) {
      this.boxes[index].tag = 'O';
      return;
    }
    this.boxes[index].tag = 'O';
    let sameTag = [];
    for (let j = 0; j < this.boxes.length; j++) {
      if (this.boxes[j].tag.slice(2) == this.selectedOption) {
        sameTag.push({ index: j, box: this.boxes[j] });
      }
    }
    switch (sameTag.length) {
      case 0:
        break;
      case 1:
        sameTag[0].box.tag = 'S_' + this.selectedOption;
        break;

      default:
        for (let k = 0; k < sameTag.length; k++) {
          if (sameTag[k].box.tag.startsWith('I')) {
            if (currentTag.startsWith('B')) {
              sameTag[k].box.tag = 'B_' + this.selectedOption;
            } else {
              sameTag[k].box.tag = 'E_' + this.selectedOption;
            }
            break;
          }
        }
        break;
    }
  }

  sizesConvert(box: any) {
    return {
      left: (this.config.canvas_width * box.left) / this.config.img_width,
      top: (this.config.canvas_height * box.top) / this.config.img_height,
      width: (this.config.canvas_width * box.width) / this.config.img_width,
      height: (this.config.canvas_height * box.height) / this.config.img_height,
    };
  }

  addTagAtIndex(i: number) {
    // get all boxes with same type
    let sameTag = [];
    for (let j = 0; j < this.boxes.length; j++) {
      if (this.boxes[j].tag.slice(2) == this.selectedOption) {
        sameTag.push({ index: j, box: this.boxes[j] });
      }
    }
    // switch based on how many boxes in same tag
    switch (sameTag.length) {
      case 0:
        this.boxes[i].tag = 'S_' + this.selectedOption;
        break;
      case 1:
        sameTag[0].box.tag = 'B_' + this.selectedOption;
        this.boxes[i].tag = 'E_' + this.selectedOption;
        break;
      default:
        for (let k = 0; k < sameTag.length; k++) {
          if (sameTag[k].box.tag.startsWith('E_')) {
            this.boxes[sameTag[k].index].tag = 'I_' + this.selectedOption;
            break;
          }
        }
        this.boxes[i].tag = 'E_' + this.selectedOption;
        break;
    }
  }
}
