import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { EditInfoComponent } from './edit-info/edit-info.component';

export const PackageModuleRoutes: Routes = [
  { path: 'product', component: ListComponent },
  { path: 'product/create', component: EditInfoComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'product/:id/edit', component: EditInfoComponent },
];
