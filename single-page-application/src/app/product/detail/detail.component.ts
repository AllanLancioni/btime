import { Component, Injector, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Globals } from '../../shared/globals.class';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends MainComponent implements OnInit {

  packageId: any = '';
  product: any = {};
  globals = Globals;
  loading: Boolean = true;

  constructor(
    private productService: ProductService,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.packageId = this.activatedRoute.snapshot.params['id'];
    this.loadPackageDetails();
  }

  async loadPackageDetails() {
    try {
      this.product = (await this.productService.getCachedProductDetail(this.packageId)).data;
    } catch (err) {
      this.errorMessage(err);
    } finally {
      this.loading = false;
    }
  }

  buyProduct() {
    this.toastrService.success(`The product ${this.product.title} is now yours!`);
    this.router.navigate(['/product']);
  }

}
