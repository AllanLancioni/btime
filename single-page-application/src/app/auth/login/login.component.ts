import {Component, Injector, OnInit} from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../shared/services/auth.service';
import { MainComponent } from '../../shared/components/main/main.component';
import { Globals } from '../../shared/globals.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, JwtHelper]
})
export class LoginComponent extends MainComponent implements OnInit {

  form: FormGroup;
  formData: any = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private jwt: JwtHelper,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ])
    });
  }

  isInvalid(prop) {
    return this.form.controls[prop].invalid && (this.form.controls[prop].dirty || this.form.controls[prop].touched);
  }

  async login() {
    try {


      if (!this.formData.email || !this.formData.password) {
        this.errorMessage('Please, inform your email and password!');
        return;
      }

      const res = await this.authService.login(this.formData);
      this.loginSuccess(res);

    } catch (err) {
      console.log(err);
      this.errorMessage(err, 'Login failed');
    }
  }

  private loginSuccess(res: any) {

    Globals.token = _.get(res, 'data.token');
    Globals.user = this.jwt.decodeToken(Globals.token);

    this.router.navigate(['/product']);

  }

}
