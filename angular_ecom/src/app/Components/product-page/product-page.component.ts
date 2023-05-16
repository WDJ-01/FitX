import { Component , OnInit} from '@angular/core';
import { Product } from 'src/assets/data/data';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { FavoritesService } from 'src/app/Services/favorites.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  product : any = []

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private cartService: CartService, 
    private favoriteService: FavoritesService,
    private alert: AlertService,

    ){}

  getProducts() {
    this.api.getProducts()
       .subscribe({
        
        next: (data) => {
          this.route.params.subscribe((routeParams) => {

            this.product = data.filter(
              (product) => product.products_id.toString()  === routeParams['productId']
            );
          });
        },

        error: (err) => console.log(err),

        complete: () => console.log(this.product)
      })
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.alert.success("Product Added")
  }
  addToFavorites(product: Product){
    this.favoriteService.addToFavorites(product)
  }

  ngOnInit() {
    this.getProducts();
  }
}
