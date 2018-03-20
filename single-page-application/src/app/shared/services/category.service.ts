import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {

  url: any = '';
  constructor(private httpClientService: HttpClientService) {
    this.url = `${environment.urls.app_api}/v3/category`;
  }

  async loadCategories(query: any = {}): Promise<any> {
    return this.httpClientService.get(`${this.url}`, query);
  }

}
