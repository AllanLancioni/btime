import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService {

  url: any = '';
  cachedPackages: any = {};
  cachedPackageDetail: any = {};

  constructor( private httpClientService: HttpClientService ) {
    this.url = `${environment.urls.app_api}/products`;
  }

  clearCache() {
    this.cachedPackages = {};
  }

  async getCachedProducts(query = {}, clearCache = false) {

    return this.httpClientService.getResultCached(this, [this.url, query], clearCache, 'cachedPackages');
  }

  async getCachedProductDetail(packageId, clearCache = false) {

    return this.httpClientService.getResultCached(this, [`${this.url}/${packageId}`], clearCache, 'cachedPackageDetail');
  }

  public async create(data: object): Promise<any> {

    return this.httpClientService.post(this.url, data);

  }

  public async update(id: string, data: object): Promise<any> {

    return this.httpClientService.put(`${this.url}/${id}`, data);

  }

  public async delete(id: string): Promise<any> {

    return this.httpClientService.delete(`${this.url}/${id}`);

  }

}
