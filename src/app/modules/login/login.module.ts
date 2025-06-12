import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: [],
})
export class LoginModule { }
