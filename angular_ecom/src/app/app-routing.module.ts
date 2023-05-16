import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Components/home/home.component'
import { ProductGalleryComponent } from './Components/product-gallery/product-gallery.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserComponent } from './Components/user/user.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { PasswordEditComponent } from './Components/password-edit/password-edit.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'category/:category' , component: ProductGalleryComponent},
  {path: 'favorites' , component: FavoritesComponent},
  {path: 'login', component: SignInComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/useredit', component: UserEditComponent},
  {path: 'user/login', component: SignInComponent},
  {path: 'user/passwordedit', component: PasswordEditComponent},
  {path: 'product/:productId', component: ProductPageComponent},










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
