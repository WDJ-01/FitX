import { Injectable } from '@angular/core';
import { Product } from 'src/assets/data/data';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: Product[] = []

  addToFavorites(product: Product){
    this.favorites.push(product)

  }
  removeFromFavorites(product: Product){
    this.favorites = this.favorites.filter((item) => item.products_id !== product.products_id);

  }

  getFavorites(){
    console.log(this.favorites)
    return this.favorites
  }

  constructor() { }
}
