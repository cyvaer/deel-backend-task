import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly svcPath = 'auth';
  constructor(private http: HttpClient) {}

  authenticate(email: any, password: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/${this.svcPath}/authenticate`,
      {
        email,
        password
      }
    );
  }

  forgot(username: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/${this.svcPath}/forgot`, {
      username,
      hostname: window.location.hostname,
      url: window.location.href,
    });
  }

  reset(resetId: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/${this.svcPath}/reset`, {
      resetId,
      hostname: window.location.hostname,
    });
  }

  changePassword(resetId: any, password: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/${this.svcPath}/changePassword`,
      {
        resetId,
        password,
        hostname: window.location.hostname,
      }
    );
  }
}
