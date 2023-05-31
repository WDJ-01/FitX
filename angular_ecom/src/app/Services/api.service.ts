import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/assets/data/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  displayUserName = new BehaviorSubject<any>('');
  displayIsLoggedIn = new BehaviorSubject<any>(false);

  //from ASP.NET Core Web API (User Methods)
  // readonly UserAPI = 'https://localhost:7196/api/Login/';
  readonly UserAPI = 'https://userapiservice.azurewebsites.net/api/Login/';

  // readonly ProductsAPI = 'https://localhost:7196/api/Products/';
  readonly ProductsAPI = 'https://userapiservice.azurewebsites.net/api/Products/';

  constructor(private http: HttpClient) {

  }

  //Products API

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.ProductsAPI + 'products');
  }

  //User API

  signup(empObj: any) {
    return this.http.post<any>(this.UserAPI + 'signup', empObj);
  }
  signin(empObj: any) {
    return this.http.post<any>(this.UserAPI + 'login', empObj);
  }
  setDisplayUser() {
      let user; 
      this.getUserInfo().subscribe((res) => {
        user = res.userinfo.user_username;
        this.displayUserName.next(user);

      });  
  }
  setDisplayIsLoggedIn(value:any) {
      this.displayIsLoggedIn.next(value);
  }
  getDisplayIsLoggedIn() {
    return this.displayIsLoggedIn.asObservable();
  }
  getDisplayUser() {
    return this.displayUserName.asObservable();
  }

  signout() {
    localStorage.clear();
  }

  updateUserInfo(empObj: any) {
    console.log(empObj);
    return this.http.put<any>(this.UserAPI + 'updateUserInfo', empObj);
  }
  changePassword(passwordObj: any) {
    return this.http.put<any>(this.UserAPI + 'changePassword', passwordObj);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.UserAPI + 'getUserInfo');
  }

  getUserCart(): Observable<any> {
    return this.http.get<any>(this.UserAPI + 'getUserCart');
  }
}
