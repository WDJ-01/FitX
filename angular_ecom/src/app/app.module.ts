import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule } from '@angular/material/toolbar'
import {MatSidenavModule } from '@angular/material/sidenav'
import {MatIconModule } from '@angular/material/icon'
import {MatListModule } from '@angular/material/list'
import {MatButtonModule } from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { ProductGalleryComponent } from './Components/product-gallery/product-gallery.component';
import { CartComponent } from './Components/cart/cart.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignupComponent } from './Components/signup/signup.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { UserComponent } from './Components/user/user.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { PasswordEditComponent } from './Components/password-edit/password-edit.component';
import { AlertComponent } from './Components/alert/alert.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductPageComponent } from './Components/product-page/product-page.component'
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductCardComponent,
    ProductGalleryComponent,
    CartComponent,
    FavoritesComponent,
    SignInComponent,
    SignupComponent,
    UserComponent,
    UserEditComponent,
    PasswordEditComponent,
    AlertComponent,
    FooterComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
