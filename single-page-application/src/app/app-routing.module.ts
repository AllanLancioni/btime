import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageModuleRoutes } from './product/product.routes';

import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', children: [ ...PackageModuleRoutes], canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'product' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
