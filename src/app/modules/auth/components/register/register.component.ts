import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('',
      Validators.required
    )},
    {
      validators: this.verifyConfirmPasswordMatch
  });
  isFormSubmitted: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.isFormSubmitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(
      this.registerForm.controls['name'].value,
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value)
      .subscribe(
        (resp: any) => {
          if (resp.status == 201) {
            this.authService.signIn(
              this.registerForm.controls['username'].value,
              this.registerForm.controls['password'].value)
              .subscribe();
        }
      });
  }

  isNameRequiredInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.get('name')?.hasError('required')) {
      return true;
    }
    return false;
  }

  isNameMinLengthInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.get('name')?.hasError('minlength')) {
      return true;
    }
    return false;
  }

  isEmailInvalid(): boolean {
    if (this.isFormSubmitted && (this.registerForm.get('username')?.hasError('required') || this.registerForm.get('username')?.hasError('email'))) {
      return true;
    }
    return false;
  }

  isPasswordRequiredInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.get('password')?.hasError('required')) {
      return true;
    }
    return false;
  }

  isPasswordMinLengthInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.get('password')?.hasError('minlength')) {
      return true;
    }
    return false;
  }

  isConfirmPasswordRequiredInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.get('confirmPassword')?.hasError('required')) {
      return true;
    }
    return false;
  }

  verifyConfirmPasswordMatch(abstractControl: AbstractControl): ValidationErrors | null {
    const password = abstractControl.get('password')?.value;
    const confirmPassword = abstractControl.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsDoNotMatch: true };
    }
  }

  isConfirmPasswordMatchInvalid(): boolean {
    if (this.isFormSubmitted && this.registerForm.hasError('passwordsDoNotMatch')) {
      return true;
    }
    return false;
  }
  
}
