import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private alertService: AlertService,
  ) {}
  loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

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
    this.loginForm = this.fb.group({
      User_username: ['', Validators.required],
      User_password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  signIn() {
    this.api.signin(this.loginForm.value).subscribe({

        next: (res) => {
        // alert(res.message)
        this.alertService.success(res.message)
        this.loginForm.reset();
        this.api.storeToken(res.token);
        this.api.setDisplayIsLoggedIn(true)
        this.api.setDisplayUser()
        // this.router.navigate(['']); 

        },
        error: (err) => {
          this.alertService.error("Something went wrong")

        }
  })
  }    
  

  onSubmit() {
    if (this.loginForm.valid) {
      // send form to data base
      this.signIn()

      
    } else {
      // throw error using toaster with required fields
      this.validateAllFormFields(this.loginForm);
      alert('your form is invalid');
    }
  }
}
