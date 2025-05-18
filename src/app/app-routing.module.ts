import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/categories/categories.module').then(m => m.CategoriesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
