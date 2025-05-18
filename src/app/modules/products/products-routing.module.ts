import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProductsComponent } from './pages/main-products/main-products.component';

const routes: Routes = [
  {
    path: '',
    component: MainProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
