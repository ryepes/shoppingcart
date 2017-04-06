import { Component, OnInit, Host, Output, EventEmitter } from '@angular/core';
import { Router}  from '@angular/router';

import {ProductService} from './../product.service';
import {CartService} from './../cart.service';
import {Product} from './../product';
import {AppComponent} from './../app.component';
import {CartEntity} from '../cart.entity';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
  providers: [ ProductService, CartService ]
})
export class CompraComponent implements OnInit {

  public selectedProduct: Product;
    public products: Product[];
    public visibleProducts : Product[];
    public product: Product;
    public filterVal = "";

  constructor(private _router: Router, private _productService: ProductService, private _cartService : CartService) { }

  ngOnInit() {
    this.getProducts();
  }

   getProducts() {
        
      this._productService.getProducts().then(function(result) {
          console.log('resultado : ' + result);
          this.products = result;
          this.visibleProducts = result;

        }.bind(this), function(err) {
            alert("Ocurrio un error al obtener los productos"); // some error message to the user would be good
        });

    }

    filter() {
        console.log(this.filterVal)
        this.visibleProducts = this.products.filter(product => product.description.toLowerCase().includes(this.filterVal.toLowerCase()));
    }

    onSelect(product: Product) {

        this.selectedProduct = product; 
    }

    appendItem(product: Product) {
        this._cartService.getCartEntryByProductId(product.id).then(function(cartEntry: CartEntity) {

          if(this.checkIfCapacityIsExeeded(cartEntry)) {

              this._cartService.addProductToCart(product);

              this._router.navigate(['carro'] );

          } else {
              alert("Ocurrio un error al obtener los productos " + cartEntry.quantity + " , tenemos disponibles " + cartEntry.product.stockQuantity );
          }

        }.bind(this));

    }

    checkIfCapacityIsExeeded(cartEntry:CartEntity):boolean {
        return cartEntry == undefined ||  (cartEntry.quantity + 1 <=  cartEntry.product.stockQuantity);
    }


}
