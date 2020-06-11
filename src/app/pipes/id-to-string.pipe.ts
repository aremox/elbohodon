import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../interfaces/interfaces';

@Pipe({
  name: 'idToString'
})
export class IdToStringPipe implements PipeTransform {

  transform(ids: number[], text: Tag[]): string {

    let texto: string = '';
    ids.forEach(id => {
    text.forEach(element => {
      if(element.id === id){
        texto += element.name; 
      }
      
    });
  });


    return texto;
  }

}
