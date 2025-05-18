import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { MainCategoriesComponent } from './pages/main-categories/main-categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    MainCategoriesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    CategoriesRoutingModule
  ],
  providers: [],
})
export class CategoriesModule { }
