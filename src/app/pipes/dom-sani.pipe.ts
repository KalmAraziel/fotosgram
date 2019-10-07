import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSani'
})
export class DomSaniPipe implements PipeTransform {
  constructor(private domSanitazer: DomSanitizer) {

  }
  transform(img: String): any {
    const domImg = `background-image: url('${ img }')`;
    return this.domSanitazer.bypassSecurityTrustStyle(domImg);
  }

}
