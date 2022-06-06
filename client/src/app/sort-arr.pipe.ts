import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArr',
})
export class SortArrPipe implements PipeTransform {
  transform(value: any[]): any[] {
    console.log(value);
    value.sort((a, b) => {
      if (a.tag.startsWith('S')) {
        return a;
      }
      if (b.tag.startsWith('S')) {
        return b;
      }
      if (a.tag.startsWith('E')) {
        return b;
      }
      if (b.tag.startsWith('E')) {
        return a;
      }
    });
    console.log(value);
    return value;
  }
}
