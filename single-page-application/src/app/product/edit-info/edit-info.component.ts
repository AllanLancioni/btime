import { Component, OnInit, Injector } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainComponent } from '../../shared/components/main/main.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-checkout',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent extends MainComponent implements OnInit {

  submittedForm: Boolean = false;
  form: FormGroup;
  productId: any = '';
  product: any = {
    title: '',
    price: 0,
    description: ''
  };
  productTitle: string;

  constructor(
    private injector: Injector,
    private productService: ProductService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.productId = _.get(this.activatedRoute, 'snapshot.params.id') || null;
    if (this.productId) {
      this.loadProduct();
    }
    this.loadForm();
  }

  loadForm() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required]),
    });
  }

  isInvalid(prop) {
    return this.form.controls[prop].invalid && (this.form.controls[prop].dirty || this.form.controls[prop].touched);
  }

  async save() {
    try {
      let product;

      if (this.productId) {
        product = (await this.productService.update(this.productId, this.product)).data;
      } else {
        product = (await this.productService.create(this.product)).data;
      }
      this.productService.clearCache();
      this.toastrService.success(`Product "${product.title}" created successfully!`);
      this.router.navigate(['/product']);
    } catch (err) {
      this.errorMessage(err);
    }
  }

  async loadProduct() {
    try {
      this.product = (await this.productService.getCachedProductDetail(this.productId)).data;
      this.productTitle = this.product.title;
    } catch (err) {
      this.errorMessage(err);
    }
  }

}
