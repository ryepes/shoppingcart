import { Component, OnInit } from '@angular/core';
import { Router}  from '@angular/router';

import {Product} from './../product';
import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {CartEntity} from '../cart.entity';
import {SumPipe} from './sum.pipe';

@Component({
    selector: 'app-carro',
    templateUrl: './carro.component.html',
    styleUrls: ['./carro.component.css'],
    providers: [ ProductService, CartService]
    //pipes: [SumPipe]
})
export class CarroComponent implements OnInit {
    public cartEntities : CartEntity[];
    public totalSum : number; 
    public subTotal : number;
    constructor(private _router: Router, private _productService: ProductService, private _cartService : CartService) { }

  ngOnInit() {
      this.getProducts();
  }

  getProducts() {

        this._cartService.getAllCartEntities().then(function(result) {

            this.cartEntities = result;
            this.calcMax();

          }.bind(this), function(err) {
              alert("Ocurrio un error al obtener los productos");
          });
    }

    removeByProductId(productId:number) {
        this.cartEntities = this.cartEntities.filter(entry => entry.product.id != productId);

        this.calcMax();

        this._cartService.saveListOfCartEntities(this.cartEntities);
    }

    changeQuantity (productId:number, valueChange:number) {

        let cartEntry = this.cartEntities.find(entry => entry.product.id === productId);

        let newValue = cartEntry.quantity + valueChange;

          console.log(newValue,cartEntry.product.stockQuantity);
        
        if(newValue > 0 && newValue <= cartEntry.product.stockQuantity) {
        
          cartEntry.quantity = newValue;
        
          this.calcMax();
        
          this._cartService.saveListOfCartEntities(this.cartEntities);
        }

    }

    calcMax () {

      let totalSum = 0;
      this.cartEntities.forEach(function(entity) {
          totalSum += entity.quantity * entity.product.price;
      });
      this.totalSum = totalSum;
    }

    subTotalItem() {
        let totalSum = 0;
        this.cartEntities.forEach(function(entity) {
            totalSum += entity.quantity * entity.product.price;
        });
        this.totalSum = totalSum;
    }

    goToShopping() {
        this._router.navigate(['compra'] );
    }
}
