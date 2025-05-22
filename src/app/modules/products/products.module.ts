import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainProductsComponent } from './pages/main-products/main-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateproductDialogComponent } from './dialogs/create-updateproduct-dialog/create-updateproduct-dialog.component';
import { FormCreateUpdateProductComponent } from './components/form-create-update-product/form-create-update-product.component';

@NgModule({
  declarations: [
    MainProductsComponent,
    CreateUpdateproductDialogComponent,
    FormCreateUpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class ProductsModule { }
