import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientService } from './services/http-client.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryService } from './services/category.service';
import { InputComponent } from './components/input/input.component';
import { ProductService } from './services/product.service';
import { ToastrHelper } from './utils/toastr.helper';
import { MainComponent } from './components/main/main.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [NavbarComponent, InputComponent, MainComponent],
  exports: [
    NavbarComponent,
    InputComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule,
    NgxMaskModule],
  providers: [HttpClientService, ProductService, CategoryService, ToastrHelper]
})
export class SharedModule { }
