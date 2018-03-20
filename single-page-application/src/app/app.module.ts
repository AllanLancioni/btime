import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { HttpClientService } from './shared/services/http-client.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { AuthGuard } from './shared/guard/auth.guard';
import { JwtHelper } from 'angular2-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    LoadingBarHttpModule,
    LoadingBarHttpClientModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ProductModule
  ],
  providers: [HttpClientService, AuthGuard, JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
