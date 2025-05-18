import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
