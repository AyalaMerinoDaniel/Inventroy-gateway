import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreateUpdateUserComponent } from '../../components/form-create-update-user/form-create-update-user.component';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseApi } from 'src/app/models/response.model';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  @ViewChild('formUser', { static: true }) formUserComponent!: FormCreateUpdateUserComponent;

  titleDialog: string = 'Crear Usuario';
  textButton: string = 'Guardar';

  id?: number; //id User

  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService,
    private matDialogRef: MatDialogRef<CreateUpdateUserComponent>
  ) { }

  ngOnInit(): void {
    if(this.id){
      this.getUserById(this.id);
    }
  }

  getUserById(id: number){
    this.usersService.getUserById(id).subscribe({
      next: res=>{
        if(res.statusCode === ResponseTypeEnum.OK){
          const data: UserModel = res.result;
          this.setDetailToForm(data);
        }
      }
    })
  }

  setDetailToForm(data: UserModel){
    this.formUserComponent.form.patchValue(data);
    this.titleDialog = 'Actualizar Usuario';
    this.textButton = 'Actualizar';
  }

  onSubmitForm(){
    const form = this.formUserComponent.form;
    if(form.valid){
      const {confirmPassword, ...user} = form.value;
      const data: UserModel = user;
      if(this.id){
        data.id = this.id;
        delete data.password;
        this.requestUpdateUser(data);
      }else{
        this.requestCreateUser(data);
      }
    }else{
      this.messagesService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED)
      form.markAllAsTouched();
    }
  }

  requestCreateUser(body : UserModel){
    this.usersService.createUser(body).subscribe({
      next: res => {
        this.proccessResponse(res);
      }
    })
  }

  requestUpdateUser(body : UserModel){
    this.usersService.updateUser(body).subscribe({
      next: res => {
        this.proccessResponse(res);
      }
    })
  }

  proccessResponse(res: ResponseApi){
    if(res.statusCode === ResponseTypeEnum.OK){
      this.messagesService.showSuccess(res.friendlyMessage[0]);
      this.matDialogRef.close(true);
    }
  }

}
