import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'numberFilter' })
export class NumberFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any, searchText: string): any[] {

    if(items){
       items = items.split(' ')[0]
    //    items =  items.replace(/\D/g, "");
    }

    return items
  }
}