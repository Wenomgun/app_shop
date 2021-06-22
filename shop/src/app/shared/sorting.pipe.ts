import { Pipe, PipeTransform } from '@angular/core';
import {IProduct2} from "./const";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: IProduct2[] | undefined | null, type: string = ''): IProduct2[] | undefined | null {
    return products?.filter((product) => {
      return product.type === type;
    })
  }

}
