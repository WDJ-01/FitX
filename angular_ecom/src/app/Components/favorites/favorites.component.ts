import { Component } from '@angular/core';
import { FavoritesService } from '../../Services/favorites.service';
import { Product } from 'src/assets/data/data';
import { AlertService } from 'src/app/Services/alert.service';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  constructor(
    private favoriteService: FavoritesService,
    private alert: AlertService,
    private cartService: CartService,
    private router: Router,
  ) {}

  favorites = this.favoriteService.getFavorites();
  hasFavorites = false

  addToFavorites(product: Product) {
    this.favoriteService.addToFavorites(product);
    this.favorites = this.favoriteService.getFavorites();
  }
  removeFromFavorites(product: Product) {
    this.favoriteService.removeFromFavorites(product);
    this.favorites = this.favoriteService.getFavorites();
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.alert.success('Product Added');
  }

  checkForFavorites(){
    if (this.favorites.length < 1){
     return  false

    }else {
      return  true
    }
  }
  navigate(productId: any) {
    console.log("nav")
    this.router.navigateByUrl("product/"+productId);
};
}
