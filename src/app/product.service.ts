import { Injectable } from '@angular/core';

import {PRODUCTS} from './inventory';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts() {
    return Promise.resolve(PRODUCTS);
  }

}
