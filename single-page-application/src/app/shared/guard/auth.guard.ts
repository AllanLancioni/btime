import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { ToastrHelper } from '../utils/toastr.helper';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private jwtHelper: JwtHelper,
    private toast: ToastrHelper
  ) { }

  canActivate() {
    const token = localStorage.getItem('token');
    console.log(token, typeof token === 'string');

    if ( !token || token.length < 10 ) {
        this.router.navigate(['/login']);
        this.toast.error('You have to be logged in to access this page!');
        return false;
    }

    if ( token && !this.jwtHelper.isTokenExpired(token) ) {
      console.log(
        this.jwtHelper.decodeToken(token),
        this.jwtHelper.getTokenExpirationDate(token),
        this.jwtHelper.isTokenExpired(token)
      );
      return true;
    }

    if (token && this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem('token', null);
      this.toast.error('Sorry, session expired!');
    }
  }
}
