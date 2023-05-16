import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Product } from 'src/assets/data/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  @Input() total = this.cartService.totalCost()

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.items = this.cartService.getItems();
    this.total = this.cartService.totalCost()


  }
  clearCart() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
    this.total = this.cartService.totalCost()

  }
  incCartitems(product: Product) {
    this.cartService.incCartitems(product);
    this.items = this.cartService.getItems(); 
    this.total = this.cartService.totalCost()


  }

  descCartitems(product: Product) {
    this.cartService.descCartitems(product);
    this.items = this.cartService.getItems();
    this.total = this.cartService.totalCost()
 

  }
  navigate(productId: any) {
    console.log("nav")
    this.router.navigateByUrl("product/"+productId);
};

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}
   ngOnInit(): void {
    this.total = this.cartService.totalCost()

   }
}
