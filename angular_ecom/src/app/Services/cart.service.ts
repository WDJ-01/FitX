import { Injectable } from '@angular/core';
import { Product, CartItem } from 'src/assets/data/data';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // items: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;

 
  totalItems = new BehaviorSubject<any>(0);

  constructor(private api: ApiService) {}
  
  /*BASIC CALCS*/

  addToCart(product: Product) {
    let exist = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product === product) {
        exist = true;
        this.items[i].amount += 1;
        break;
      }
    }
    if (exist === false) {
      this.items.push({
        product: product,
        amount: 1,
      });
    }
    this.totalCost()
    this.setCartTotalItems()

    exist = false;
  }

  removeFromCart(product: Product) {
    let item = this.items.find( i => i.product.products_id == product.products_id)
    let value = item?.amount
    this.items = this.items.filter(
      (item) => item.product['products_id'] !== product['products_id']
    );
    this.setCartTotalItems()
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.setCartTotalItems()
    return this.items;
  }
  incCartitems(product: Product) {
    this.addToCart(product);
    this.setCartTotalItems()
  }

  descCartitems(product: Product) {
    let deducted = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product === product && this.items[i].amount > 1) {
        this.items[i].amount -= 1;
        deducted = true;
        break;
      }
    }
    if (deducted === false) {
      this.items = this.items.filter(
        (item) => item.product['products_id'] !== product['products_id']

      );

    }
    deducted = false;
    this.setCartTotalItems()

  }
  

  /*TOTALCOST*/
  totalCost() {
    this.total = 0;
    for (let i = 0; i < this.items.length; i++) {
      let itemPrice = this.items[i].product['products_price'];
      let amount = this.items[i].amount;

      let product_total = itemPrice * amount;
      this.total += product_total;
    }
    return this.total;
  }

  //Cart Items Amount Display

  setCartTotalItems(){
     let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      let amount = this.items[i].amount;

      total += amount;
    }
    this.totalItems.next(total)

  }

  getCartTotalItems() {
    console.log(this.totalItems)
    return this.totalItems.asObservable()
  }

  
}
