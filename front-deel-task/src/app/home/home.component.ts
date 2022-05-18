import {
  Component,
} from '@angular/core';

export interface User
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  isScreenSmall: boolean;
  // navigation: Navigation;
  user: User;
  // private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
  }

}
