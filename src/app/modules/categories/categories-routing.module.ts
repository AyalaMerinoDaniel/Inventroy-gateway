import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoriesComponent } from './pages/main-categories/main-categories.component';

const routes: Routes = [
  {
    path: '',
    component: MainCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
