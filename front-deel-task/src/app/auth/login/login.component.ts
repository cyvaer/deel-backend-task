import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Const } from '../../common/const';
import { AuthService } from '../../services/auth.service';
import { ContextService } from "../../services/context.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private authService: AuthService,
    private contextService: ContextService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      rememberMe: new FormControl(false),
      authFailed: false,
    });
    this.loginForm
      .get('userName')
      .valueChanges.subscribe(() => this.setAuthFailed());
    this.loginForm
      .get('password')
      .valueChanges.subscribe(() => this.setAuthFailed());
  }

  ngOnInit() {}

  onForgot = () => this.router.navigate([`/${Const.routes.forgot}`]);

  // @ts-ignore
  setAuthFailed = (failed = false) => (this.loginForm.authFailed = failed);

  onSubmit(data: any) {
    this.authService.authenticate(data.userName, data.password).subscribe(
      (res: any) => {
        if (res && res.token && res.user) {
          this.contextService.setUserInfo(res);


          // this.masterData.load((result : any) => {
            // if (result && result.loaded) {
              this.router.navigate([`/${Const.routes.home}`]);
            // } else {
              // this.setAuthFailed(true);
            // }
         // });


        } else {
          this.setAuthFailed(true);
        }
      },
      (err : any) => this.setAuthFailed(true)
    );
  }
}
