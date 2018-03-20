import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';
import { EditInfoComponent } from './edit-info/edit-info.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditInfoComponent
  ],
  providers: []
})
export class ProductModule { }
