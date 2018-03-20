import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../globals.class'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';

@Injectable()
export class HttpClientService {

  private token: any = {};
  constructor(
    private http: HttpClient
  ) { }

  private async createRequestOptions() {
    const token = Globals.token;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ... token ? {'Authorization': token } : {}
      })
    };
  }

  async get(url, paramsRequest: Object = {}) {

    let params = new HttpParams();

    Object.keys(paramsRequest).forEach(param => {
      params = params.append(param, paramsRequest[param]);
    });

    const headers = await this.createRequestOptions();
    return this.http.get(url, { ...headers, params })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err.error instanceof Error ? err.error.message : `${err.error.message}`));
  }

  async post(url, data) {

    console.log(url, data);

    return this.http.post(url, data, await this.createRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        return Promise.reject(err.error instanceof Error ? err.error.message : `${err.error.message}`);
      });
  }

  async put(url, data = {}) {
    return this.http.put(url, data, await this.createRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err.error instanceof Error ? err.error.message : `${err.error.message}`));
  }

  async delete(url, data = {}) {
    return this.http.delete(url, await this.createRequestOptions())
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err.error instanceof Error ? err.error.message : `${err.error.message}`));
  }

  async getResultCached(ctx, params, clearCache = false, actualCache: string, fn: string | Function = (x, query?) => this.get(x, query)) {

    params = params instanceof Array ? params : [params];

    try {
      const keyName = JSON.stringify(params );
      if (!ctx[actualCache][keyName] || clearCache) {
        ctx[actualCache][keyName] = await (typeof fn === 'string' ? ctx[fn] : fn).apply(ctx, params);
      }
      return ctx[actualCache][keyName];
    } catch (err) {
      console.error(err);
      // TODO: toast error
      // TODO: toast error
    }
  }
}
