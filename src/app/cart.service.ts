import { Injectable } from '@angular/core';
import {PRODUCTS} from './inventory';
import {Product} from './product';

import {CartEntity} from './cart.entity';

@Injectable()
export class CartService {

  private _storage = localStorage;

  constructor() { 
    this.initCart();
  }

  initCart () {
      if(!this._storage.getItem('cart')) {

          let emptyMap : { [key:string]:number; } = {};
          this.setCart(emptyMap);
      }

  }

  saveListOfCartEntities(listOfCartEntries : CartEntity[]) {
      let cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
          map[cartEntry.product.id] = cartEntry;
          return map;
      }, {});

      this.setCart(cartMap);

  }
 
  getAllCartEntities()  {
    
    let myCartMap = this.getCart();
    let cartEntities : CartEntity[] = [];

    for (let key in myCartMap) {
      let value = myCartMap[key];
      cartEntities.push(value);
    }

    return Promise.resolve(cartEntities);

  }
  
  getCartEntryByProductId(productId) {

    let myCartMap = this.getCart();
    console.log(myCartMap);
    return Promise.resolve(myCartMap[productId]);

  };

  addProductToCart(product: Product) : void{
  
      let cartMap = this.getCart();

        if(cartMap[product.id] != undefined) {

            let cartInstance = cartMap[product.id];
            cartInstance.quantity++;
            cartMap[product.id] = cartInstance;

        } else {
          cartMap[product.id] = {
            'product':product,
            'quantity':1
          }
        }
      
      this.setCart(cartMap);

  }

  private getCart() {

     let cartAsString = this._storage.getItem('cart');
     return JSON.parse(cartAsString);

  }

  private setCart(cartMap) : void{
      this._storage.setItem('cart',JSON.stringify(cartMap));
  }

  clearTheCart() {
      this._storage.clear();
  }
}
