import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { UserAccess } from 'src/app/shared/models/user-access';
import { KeyValue } from 'src/app/shared/models/key-value';
import { Const } from 'src/app/common/const';
import { Subject } from 'rxjs';
import * as moment from 'moment';

interface authObject {
  expiresIn: string
  idToken: string
}

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  constructor() {}

  private refreshDataSource = new Subject<string>();
  public refreshData = this.refreshDataSource.asObservable();
  public userChanges = new EventEmitter();
  private token: string;
  private userData: User;
  private readonly canPersist = 'rememberMe';
  private readonly user = 'id_token';

  // setUserInfo(userData: { user: any; token: string; }, rememberMe: string) {
  setUserInfo(authResult: authObject) {

    const expiresAt = moment().add(authResult.expiresIn,'second');
    console.log('setUserInfo', JSON.stringify(authResult));
    localStorage.setItem('id_token', JSON.stringify(authResult.idToken));
    localStorage.setItem("expires_at", JSON.parse(JSON.stringify(expiresAt.valueOf())));

    /*

    const userInfo = userData.user;
    this.token = userData.token;
    localStorage.setItem(this.canPersist, rememberMe);
    const offices: KeyValue[] = [];
    console.log(userInfo);
    if (userInfo.OFFICE_LIST) {
      userInfo.OFFICE_LIST.forEach((office: { OFFICE_ID: string; OFFICE_NAME: string; }) =>
        offices.push(new KeyValue(office.OFFICE_ID, office.OFFICE_NAME))
      );
    }
    const user = new User(
      userInfo.USER_ID,
      userInfo.FIRST_NAME,
      userInfo.MIDDLE_NAME,
      userInfo.LAST_NAME,
      userInfo.EMAIL,
      userInfo.PHOTO_URL,
      new UserAccess(
        userInfo.ROLE,
        userInfo.COMBINATION_ID,
        offices,
        userData.token
      ),
      userInfo.companyName
    );
    user.preference = userInfo.preference;
    this.userData = user;
    const userStringify = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(this.user, userStringify);
    } else {
      sessionStorage.setItem(this.user, userStringify);
    }

     */
  }

  clearUserInfo() {
    localStorage.removeItem(this.user);
    sessionStorage.removeItem(this.user);
    localStorage.removeItem(this.canPersist);
  }

  getUserInfo(): User {
    if (!this.userData) {
      let userInfo = null;
      const rememberMe = localStorage.getItem(this.canPersist);
      if (JSON.parse(rememberMe)) {
        userInfo = localStorage.getItem(this.user);
      } else {
        userInfo = sessionStorage.getItem(this.user);
      }
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        if (!this.token) {
          this.token = userInfo.access.token;
        }
      }
      this.userData = userInfo;
    }
    return this.userData;
  }

  getUserInfo2(): any {
    console.log('getUserInfo2');
    let userInfo = null;
    userInfo = localStorage.getItem(this.user);
    // alert(userInfo);
    console.log('userInfo', userInfo);
    if(userInfo){
      console.log('aaaaa');
      return userInfo;
    }else{
      console.log('bbbbb');
      return null;
    }

  }

  getToken() {
    if (!this.userData) {
      return this.getUserInfo2();
    }
    return this.token;
  }

  getPreference() {
    if (this.userData) {
      return this.userData.preference;
    }
    return {};
  }

  setPreference(preference: any) {
    if (this.userData) {
      this.userData.preference = preference;
    }
  }

  isAdminUser = () =>
    this.getUserInfo() &&
    this.userData &&
    this.userData.access &&
    this.userData.access.role === Const.Admin;

  refreshPageData(source: string) {
    this.refreshDataSource.next(source);
  }

  refreshPhoto() {
    this.userChanges.emit(true);
  }
}
