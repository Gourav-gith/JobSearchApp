import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'jobLocationFilter' })
export class JobLocationFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any, searchText: string): any[] {

    let value

    if(items){
        for (let index = 0; index < items.length; index++) {
            let element = items[index];
            if(value){
                value = value  +  ' , '  +  element.city_name        
            }else{
                value = element.city_name
            }
        }
    }

    return value
  }
}