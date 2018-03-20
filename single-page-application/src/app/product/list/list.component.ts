import {Component, Injector, OnInit} from '@angular/core';
import { Globals } from '../../shared/globals.class';
import { CategoryService } from '../../shared/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MainComponent } from '../../shared/components/main/main.component';
import { ProductService } from '../../shared/services/product.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends MainComponent implements OnInit {

  products: any = [];
  loading: Boolean = true;
  userId: string;

  constructor(
    private productService: ProductService,
    private injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.userId = Globals.user.data._id;
    this.loadProducts();
  }

  async loadProducts(skip = 0, clearCache = false) {
    try {
      const result = (await this.productService.getCachedProducts({skip}, clearCache));
      this.products = result.data;
    } catch (err) {
      this.errorMessage(err);
    } finally {
      this.loading = false;
    }
  }

  viewDetails(productId) {
    this.router.navigateByUrl(`product/${productId}`);
  }

  createProduct() {
    this.router.navigateByUrl(`product/create`);
  }

  editProduct(product: any) {
    this.router.navigateByUrl(`product/${product.id}/edit`);
  }

  async deleteProduct(product: any = {}) {
    try {
      await this.productService.delete(product.id);
      this.loadProducts(0, true);
      this.toastrService.success(`Product "${product.title}" deleted successfully!`);
    } catch (err) {
      this.errorMessage(err);
    }

  }
}
