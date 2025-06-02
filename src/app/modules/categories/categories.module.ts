import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { MainCategoriesComponent } from './pages/main-categories/main-categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreateUpdateCategoryComponent } from './components/form-create-update-category/form-create-update-category.component';
import { CreateUpdateCategoryDialogComponent } from './dialogs/create-update-category-dialog/create-update-category-dialog.component';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';

@NgModule({
  declarations: [
    MainCategoriesComponent,
    FormCreateUpdateCategoryComponent,
    CreateUpdateCategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [],
})
export class CategoriesModule { }
