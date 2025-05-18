import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { IconComponent } from './icon/icon.component';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    IconComponent,
    InputFormComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    IconComponent
  ]
})
export class GeneralComponentsModule {}
