import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { environment } from '../../../environments/environment';
import { Globals } from '../globals.class';
import * as _ from 'lodash';

@Injectable()
export class AuthService {

  url: string;
  constructor(private httpClientService: HttpClientService) {
    this.url = environment.urls.app_api;
  }

  async login(data: { email, password }): Promise<any> {
    return new Promise( async(resolve, reject) => {
      try {
        const res = await this.httpClientService.post(`${this.url}/login`, data);
        Globals.token = _.get(res, 'data.token');
        Globals.user = Globals.jwtHelper.decodeToken(Globals.token);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });

  }

  async create(data): Promise<any> {
    return this.httpClientService.post(`${this.url}/register`, data);
  }

}
