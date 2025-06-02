import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule, GeneralComponentsModule, HttpClientModule],
  providers: [],
})
export class DialogsModule {}
