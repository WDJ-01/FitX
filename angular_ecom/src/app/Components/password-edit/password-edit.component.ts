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
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) {}

  passwordEditForm!: FormGroup;
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
    this.passwordEditForm = this.fb.group({
      User_currentPassword: ['', Validators.required],
      User_newPassword: ['', Validators.required],
      User_confirmNewPassword: ['', Validators.required],

    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  changePassword() {
    this.api.changePassword(this.passwordEditForm.value).subscribe({
      next: (res) => {
        this.alert.success("Password Updated Successfully")
        this.passwordEditForm.reset();
  
      },
      error: (err) => {
        this.alert.error("Something Went Wrong")
      }
     });
  }

  onSubmit() {
    if (this.passwordEditForm.valid) {
      // send form to data base
      this.changePassword();
      console.log(this.passwordEditForm.value)
    } else {
      // throw error using toaster with required fields
      this.validateAllFormFields(this.passwordEditForm);
      alert('your form is invalid');
    }
  }


}
