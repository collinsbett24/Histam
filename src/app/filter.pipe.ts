import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {

    if (!items || !searchTerm) {
      return [];
    }
    if (!searchTerm) {
      return ;
    }
    searchTerm = searchTerm.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
  }
}
