import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/assets/data/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mensList: Product[] = [];
  womensList: Product[] = [];
  runningList: Product[] = [];
  weightliftingList: Product[] = [];

  constructor(
    private api: ApiService, 
    private route: ActivatedRoute,
    private router: Router) {}

  getProducts() {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.mensList = data
          .filter((product) => product.category_id_ref === 'men')
          .slice(0, 4);
        this.womensList = data
          .filter((product) => product.category_id_ref === 'women')
          .slice(0, 4);
        this.runningList = data
          .filter((product) => product.category_id_ref === 'running')
          .slice(0, 4);
        this.weightliftingList = data
          .filter((product) => product.category_id_ref === 'weightlifting')
          .slice(0, 4);
      },

      error: (err) => console.log(err),

      complete: () => console.log('observable complete'),
    });
  }
  navigate(productId: any) {
    console.log('nav');
    this.router.navigateByUrl('product/' + productId);
  }

  ngOnInit() {
    this.getProducts();
  }
}
