import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainProductsComponent } from './pages/main-products/main-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';

@NgModule({
  declarations: [
    MainProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule
  ],
  providers: [],
})
export class ProductsModule { }
