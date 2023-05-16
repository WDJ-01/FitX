import { Component , OnInit} from '@angular/core';
import { OnSameUrlNavigation } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  isLoggedIn = false

  userInfo = {
    fullname: "",
    username: "",
    email: "",
    phone: 'n/a',
    mobile: 'n/a',
    address: "n/a",

  }

  constructor(
    private api : ApiService
  ){}

  getUserInfo(){
    this.api.getUserInfo().subscribe((res) => {
      this.userInfo.fullname = `${res.userinfo.user_firstname} ${res.userinfo.user_lastname}  `
      this.userInfo.username = res.userinfo.user_username
      this.userInfo.email = res.userinfo.user_email 
      this.userInfo.phone = res.userinfo.user_phone
      this.userInfo.mobile= res.userinfo.user_mobile
      this.userInfo.address = res.userinfo.user_address

   
    })
  }

  ngOnInit(): void {
    if(this.api.isLoggedIn()){
    this.isLoggedIn = true
    this.getUserInfo()
    }else{
      this.isLoggedIn = false
    }
  }

}
