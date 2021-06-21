import { Pipe, PipeTransform } from '@angular/core';
import {IProduct2} from "./const";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct2[] | undefined | null, productName: string = ''): IProduct2[] | undefined | null {
    if(!productName.trim()) {
      return products;
    }

    return products?.filter((product) => {
      return product.name.toLowerCase().includes(productName.toLowerCase());
    })
  }

}
