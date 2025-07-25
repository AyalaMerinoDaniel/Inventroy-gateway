import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { IconComponent } from './icon/icon.component';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { StrokedButtonComponent } from './stroked-button/stroked-button.component';
import { BaseFiltersComponent } from './base-filters/base-filters.component';
import { FlatButtonComponent } from './flat-button/flat-button.component';
import { BaseDialogComponent } from './base-dialog/base-dialog.component';
import { SelectorComponent } from './selector/selector.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SectionCardComponent } from './section-card/section-card.component';

@NgModule({
  declarations:[
    IconComponent,
    InputFormComponent,
    PaginatorComponent,
    StrokedButtonComponent,
    BaseFiltersComponent,
    FlatButtonComponent,
    BaseDialogComponent,
    SelectorComponent,
    DatePickerComponent,
    SectionCardComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    IconComponent,
    PaginatorComponent,
    InputFormComponent,
    StrokedButtonComponent,
    BaseFiltersComponent,
    FlatButtonComponent,
    BaseDialogComponent,
    SelectorComponent,
    DatePickerComponent,
    SectionCardComponent
  ]
})
export class GeneralComponentsModule {}
