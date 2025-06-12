import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [],
})
export class HomeModule { }
