import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  username = '';
  isLoggedIn = false;
  cartTotalItems: any = 0;
  totalCost = 0;

  constructor(
    private api: ApiService,
    private cart: CartService,
    private alert: AlertService
  ) {
    this.api.getDisplayIsLoggedIn().subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.api.getDisplayUser().subscribe((value) => {
      this.username = value;
    });

    this.cart.getCartTotalItems().subscribe((value) => {
      this.cartTotalItems = value;
    });
  }

  isVisible: boolean = false;
  onClick() {
    this.isVisible = !this.isVisible;
  }
  signout() {
    this.api.signout();
    this.api.setDisplayIsLoggedIn(false);

    if (this.api.isLoggedIn()) {
      this.alert.error('Log Out Failed');
    } else {
      this.alert.success('Successfully Logged Out');
    }

    console.log('signed out');
  }

  getTotalCost() {
    this.totalCost = this.cart.totalCost();
  }

  ngOnInit(): void {
    let user = localStorage.getItem('token');
    if (user) {
      this.api.setDisplayUser();
      this.api.setDisplayIsLoggedIn(true);
      this.api.getDisplayIsLoggedIn().subscribe((value) => {
        this.isLoggedIn = value;
      });
      this.api.getDisplayUser().subscribe((value) => {
        this.username = value;
      });
    }
    this.cart.getCartTotalItems().subscribe((value) => {
      this.cartTotalItems = value;
    });
  }
}
