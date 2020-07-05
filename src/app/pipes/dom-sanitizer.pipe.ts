import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor( private donSanitizer: DomSanitizer ){}

  transform(img: string): any {

    const domImg = `url(' ${img}')`;

    return this.donSanitizer.bypassSecurityTrustStyle( domImg);
  }

}
