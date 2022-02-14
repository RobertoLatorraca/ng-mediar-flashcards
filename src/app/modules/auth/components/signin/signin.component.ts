import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', 
      Validators.required
    )
  });
  isFormSubmitted: boolean = false;
  is401Unauthorized: boolean = false;
  isInternalServerError: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.isFormSubmitted = true;
    this.is401Unauthorized = false;
    this.isInternalServerError = false;
    if (!this.signInForm.valid) {
      return;
    }
    this.authService.signIn(
      this.signInForm.controls['username'].value,
      this.signInForm.controls['password'].value)
      .subscribe(
        (resp: any) => { },
        (err: any) => {
          if (err.status == 401) {
            this.is401Unauthorized = true;
          } else {
            this.isInternalServerError = true;
          }
        }
      );
  }

  isEmailInvalid(): boolean {
    if (this.isFormSubmitted && (this.signInForm.get('username')?.hasError('required') || this.signInForm.get('username')?.hasError('email'))) {
      return true;
    }
    return false;
  }

  isPasswordRequiredInvalid(): boolean {
    if (this.isFormSubmitted && this.signInForm.get('password')?.hasError('required')) {
      return true;
    }
    return false;
  }

}