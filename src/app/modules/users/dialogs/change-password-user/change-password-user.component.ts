import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { ChangePasswordModel } from '../../models/change-password-user.model';
import { UsersService } from '../../services/users.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss'],
})
export class ChangePasswordUserComponent implements OnInit {
  form: FormGroup;
  keyFormNewPassword = 'newPassword';

  dataUser?: UserModel;

  constructor(
    private messagesServices: MessagesService,
    private usersService: UsersService,
    private matDialogRef: MatDialogRef<ChangePasswordUserComponent>
  ) {
    this.form = new FormGroup({
      [`${this.keyFormNewPassword}`]: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmitForm(){
    if(this.form.valid){
      const data: ChangePasswordModel = this.form.value;
      data.id = this.dataUser?.id ?? 0;
      this.requestChangePassword(data);
    }else{
      this.messagesServices.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
      this.form.markAllAsTouched();
    }
  }

  requestChangePassword(body: ChangePasswordModel){
    this.usersService.changePassword(body).subscribe({
      next: res =>{
        if(res.statusCode === ResponseTypeEnum.OK){
          this.messagesServices.showSuccess(res.friendlyMessage[0]);
          this.matDialogRef.close(true);
        }
      }
    })
  }
}
