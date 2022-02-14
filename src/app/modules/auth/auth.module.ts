import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    SigninComponent,
    RegisterComponent,
    ResetPasswordComponent,
    GoogleSigninComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
