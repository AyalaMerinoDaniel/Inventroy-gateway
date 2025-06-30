import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPurchaseComponent } from './pages/main-purchase/main-purchase.component';
import { ListPurchaseComponent } from './pages/list-purchase/list-purchase.component';
import { NewEditPurchaseComponent } from './pages/new-edit-purchase/new-edit-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: MainPurchaseComponent,
    children: [
      {
        path: 'list',
        component: ListPurchaseComponent
      },
      {
        path: 'new',
        component: NewEditPurchaseComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
