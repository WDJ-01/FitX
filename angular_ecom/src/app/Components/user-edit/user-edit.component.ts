import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/shared/Usermodel';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) {}

  userEditForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupObj = new UserModel();

  userInfo = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: 'n/a',
    mobile: 'n/a',
    address: "n/a",

  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ngOnInit(): void {
    this.api.getUserInfo().subscribe((res) => {
      this.userInfo.firstname = res.userinfo.user_firstname
      this.userInfo.lastname = res.userinfo.user_lastname
      this.userInfo.username = res.userinfo.user_username
      this.userInfo.email = res.userinfo.user_email
      this.userInfo.phone = res.userinfo.user_phone
      this.userInfo.mobile = res.userinfo.user_mobile
      this.userInfo.address = res.userinfo.user_address


    })
    this.userEditForm = this.fb.group({
      User_username: ['', Validators.required],
      User_firstname: ['', Validators.required],
      User_lastname: ['', Validators.required],
      User_email: ['', Validators.required],
      User_mobile: ['', Validators.required],
      User_phone: ['', Validators.required],
      User_address: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  updateUserInfo() {
    this.api.updateUserInfo(this.userEditForm.value).subscribe({
      next: (res) => {
        this.alert.success("Profile Updated")
        this.userEditForm.reset();
  
      },
      error: (err) => {
this.alert.error("Profile Update Failed")
      }
     });
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      // send form to data base
      this.updateUserInfo();
    } else {
      // throw error using toaster with required fields
      this.validateAllFormFields(this.userEditForm);
      alert('your form is invalid');
    }
  }


}
