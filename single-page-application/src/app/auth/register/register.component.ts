import {Component, Injector, OnInit} from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../shared/services/auth.service';
import { MainComponent } from '../../shared/components/main/main.component';
import { Globals } from '../../shared/globals.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, JwtHelper]
})
export class RegisterComponent extends MainComponent implements OnInit {

  form: FormGroup;
  formData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ])
    });
  }

  isInvalid(prop) {
    return this.form.controls[prop].invalid && (this.form.controls[prop].dirty || this.form.controls[prop].touched);
  }

  async register() {

    try {
      if (this.formData.password !== this.formData.confirmPassword) {
        return this.errorMessage('Different passwords!');
      }
      for (const prop in this.formData) {
        if (!prop) {
          this.errorMessage(`All field are required! Missing field "${prop}"`);
        }
      }

      const res = await this.authService.create(_.omit(this.formData, 'confirmPassword'));
      this.toastrService.success(`User created successfully! Welcome ${res.data.name}`);
      const login = await this.authService.login(_.omit(this.formData, ['confirmPassword', 'name']));
      this.router.navigate(['/product']);
    } catch (err) {
      this.errorMessage(err);
    }
  }

}
