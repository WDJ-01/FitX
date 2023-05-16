import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/assets/data/data';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { FavoritesService } from '../../Services/favorites.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  // @Input() display: Product[] = [];
  @Input() display: any = [];


  constructor(
    private cartService: CartService, 
    private favoriteService: FavoritesService,
    private alert: AlertService,
    private router: Router,
    ) {}

  addToCart(product: Product) {
    console.log(product)
    this.cartService.addToCart(product);
    this.alert.success("Product Added")
  }
  addToFavorites(product: Product){
    this.favoriteService.addToFavorites(product)
  }
  navigate(productId: any) {
    console.log("nav")
    this.router.navigateByUrl("product/"+productId);
};
}
