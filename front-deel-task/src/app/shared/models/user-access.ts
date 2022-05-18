import { KeyValue } from './key-value';

export class UserAccess {
  public role: string;
  public officeList: Array<KeyValue>;
  public token: string;
  public constructor(
    role: string,
    combinationId: number,
    officeList: Array<KeyValue>,
    token: string
  ) {
    this.role = role;
    this.officeList = officeList;
    this.token = token;
  }
}
