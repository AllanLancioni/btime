import { Component, OnInit, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrHelper } from '../../utils/toastr.helper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  protected toastrService: ToastrService;
  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  private toastrHelper: ToastrHelper;

  constructor(injector: Injector) {
    this.toastrService = injector.get(ToastrService);
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.toastrHelper = injector.get(ToastrHelper);
  }

  errorMessage(message: any = '', title: any = '') {
    this.toastrHelper.error(message, title);
  }

}
