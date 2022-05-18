import  { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ContextService } from '../../services/context.service';
import { Const } from 'src/app/common/const';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private context: ContextService,
    private router: Router,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.context.getToken()) {
      return true;
    }
    this.router.navigate([Const.routes.login]);
    return false;
  }
}
