import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Const } from 'src/app/common/const';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {AuthGuardService} from "../auth/guards/auth-guard.service";
// import { HomeComponent} from "./home.component";
import { VerticalNavigationComponent } from "../vertical-navigation/vertical-navigation.component";

const appRoutes: Routes = [
  // { path: 'login', component: LoginComponent },
  // home route protected by auth guard
  // { path: Const.routes.home, component: HomeComponent, canActivate: [AuthGuardService] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

const routes: Routes = [
  {
    path: Const.routes.home,
    // component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [],
  },
];

@NgModule({
  declarations: [
    // HomeComponent,
    VerticalNavigationComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule {}
