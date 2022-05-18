import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Const } from '../../common/const';
import { Router } from '@angular/router';
import { ContextService } from '../../services/context.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly AUTH_HEADER = 'sessionid';

  public constructor(private router: Router, private context: ContextService) {
    this.router = router;
    this.context = context;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't add headers for authentication service (login, reset, forgot)
    if (req.url.includes(Const.paths.auth)) {
      return next.handle(req);
    }
    // Get Token
    const token = this.context.getToken();
    console.log('token token token', token);

    if (!token) {
      this.routeToLogin();
      return null;
    } else {
      return next.handle(
          req.clone({
            headers: req.headers.set(this.AUTH_HEADER, token),
          }))
        .pipe(catchError((error: any) => {
            if (error) {
              if (error.status === 0 || error.status === 401 || error.status === 403 /*|| error.status === 500*/
              ) {
                this.routeToLogin();
              }
            }
            return throwError(error);
          })
        );
    }
  }

  routeToLogin() {
    this.context.clearUserInfo();
    this.router.navigate([Const.routes.login]);
  }
}
