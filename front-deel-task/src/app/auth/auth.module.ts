import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
// import { MaterialModule } from '../shared/material.module';
// import { ForgotComponent } from './forgot/forgot.component';
// import { ResetComponent } from './reset/reset.component';
import { SharedModule} from "../shared/shared.module";
import { SignInClassicComponent } from "./login2/sign-in.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent,SignInClassicComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    SharedModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule
  ],
})
export class AuthModule {}
