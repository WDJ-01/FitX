import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/shared/Usermodel';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) {}

  signupForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupObj = new UserModel()

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
    this.signupForm = this.fb.group({
      User_username: ['', Validators.required],
      User_firstname: ['', Validators.required],
      User_lastname: ['', Validators.required],
      User_email: ['', Validators.required],
      User_mobile: ['', Validators.required],
      User_phone: ['', Validators.required],
      User_address: ['', Validators.required],
      User_password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  signUp() {    
    this.api.signup(this.signupForm.value).subscribe( {
      // alert(res.message);
      next: (res) => {
        this.signupForm.reset();
        this.alert.success("Signed Up Successfully")
  
      },
      error: (err) => {
        this.alert.error("Sign Up Failed")

      }
      // this.router.navigate(['login']);
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // send form to data base
      this.signUp();
    } else {
      // throw error using toaster with required fields
      this.validateAllFormFields(this.signupForm);
      alert('your form is invalid');
    }
  }
}
