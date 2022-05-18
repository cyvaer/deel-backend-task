import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth.module';
import { LoginComponent } from './login/login.component';
import { SignInClassicComponent } from "./login2/sign-in.component";

import { Const } from '../common/const';

const routes: Routes = [{ path: Const.routes.login, component: SignInClassicComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
