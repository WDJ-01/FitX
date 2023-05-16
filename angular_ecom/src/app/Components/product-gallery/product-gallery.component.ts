import { Component, OnInit } from '@angular/core';
import { products, Product } from 'src/assets/data/data';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css'],
})
export class ProductGalleryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  productsList: any[] = [];
  display2: Product[] = [];

  // products = [...products];

  // display: any = [];

  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getProducts() {
    this.api.getProducts()
       .subscribe({
        
        next: (data) => {
          this.productsList = data; 
          this.route.params.subscribe((routeParams) => {
            this.display2 = data.filter(
              (product) => product.category_id_ref === routeParams['category']
            );
          });
        },

        error: (err) => console.log(err),

        complete: () => console.log("observable complete")
      })
  }

  ngOnInit() {
    this.getProducts();
  }
}
