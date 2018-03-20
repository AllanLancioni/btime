import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';

export class Globals {

  static jwtHelper  = new JwtHelper();

  // TOKEN
  static set token(value: any) {
    localStorage.setItem('token', JSON.stringify(value.token || value));
  }
  static get token() {
    return JSON.parse(localStorage.getItem('token'));
  }
  static get decodedToken(): any {
    return this.jwtHelper.decodeToken(this.token);
  }

  // USER
  static set user(value: any) {
    localStorage.setItem('user', JSON.stringify(value));
  }
  static get user(){
    return JSON.parse(localStorage.getItem('user'));
  }

  static logout() {
    this.token = '';
    this.user = '';
  }
}
