import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContextService} from "../../services/context.service";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Const } from '../../common/const';

@Component({
    selector     : 'sign-in-classic',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SignInClassicComponent implements OnInit
{

    usersEmail  = [
      {value: 'harry_potter@client.com'},
      {value: 'mr_robot@client.com'},
      {value: 'john_snow@client.com'},
      {value: 'ash_kethcum@client.com'},
      {value: 'john_lenon@contractor.com'},
      {value: 'linus_torvalds@contractor.com'},
      {value: 'alan_turing@contractor.com'},
      {value: 'aragon@contractor.com'},
    ];

    signInForm: FormGroup;

    constructor(private authService: AuthService,
                private contextService: ContextService,
                private _formBuilder: FormBuilder,
                private router: Router
    ) {}

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required]],
            password  : ['samplep@ssword', Validators.required],
            rememberMe: ['']
        });
    }

    signIn(data: any): void {
      console.log('signIn', data);
      this.authService.authenticate(data.email, data.password).subscribe(
        (response) => {
          this.contextService.setUserInfo(response);
          this.router.navigate([`/${Const.routes.home}`]);
        },
        (err) => console.error(err),
      );
    }

}
