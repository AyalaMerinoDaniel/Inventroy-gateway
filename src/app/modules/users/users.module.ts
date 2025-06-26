import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { UsersRoutingModule } from './users-routing.module';
import { MainUsersComponent } from './pages/main-users/main-users.component';
import { NameTypeUserPipe } from './pipes/name-type-user/name-type-user.pipe';
import { StatusUserTypePipe } from './pipes/status-user-type/status-user-type.pipe';
import { CreateUpdateUserComponent } from './dialogs/create-update-user/create-update-user.component';
import { FormCreateUpdateUserComponent } from './components/form-create-update-user/form-create-update-user.component';
import { ChangePasswordUserComponent } from './dialogs/change-password-user/change-password-user.component';

@NgModule({
  declarations: [
    MainUsersComponent,
    NameTypeUserPipe,
    StatusUserTypePipe,
    CreateUpdateUserComponent,
    FormCreateUpdateUserComponent,
    ChangePasswordUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    GeneralComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [],
})
export class UsersModule { }
