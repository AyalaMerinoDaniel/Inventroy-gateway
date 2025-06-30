import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { MainPurchaseComponent } from './pages/main-purchase/main-purchase.component';
import { ListPurchaseComponent } from './pages/list-purchase/list-purchase.component';
import { NewEditPurchaseComponent } from './pages/new-edit-purchase/new-edit-purchase.component';

@NgModule({
  declarations: [
    MainPurchaseComponent,
    ListPurchaseComponent,
    NewEditPurchaseComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [],
})
export class PurchaseModule { }
