import { UserAccess } from './user-access';

export class User {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public photo: string;
  public access: UserAccess;
  public preference: any;
  public fullName: string;
  public companyName: string;

  public constructor(
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    photo: string,
    access: UserAccess,
    companyName: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.photo = photo;
    this.access = access;
    this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`;
    this.companyName = companyName;
  }
}

export interface UserSQL {
  USER_ID: number;
  ROLE_ID: number;
  ROLE_NAME: string;
  ROLE: string;
  FIRST_NAME: string;
  MIDDLE_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  ZIP: string;
  ACTIVE: string;
  PHOTO_URL?: string | null;
  STAFF_PHOTO?: null | string;
}
