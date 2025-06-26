import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserStatusEnum, UserStatusListEnum, UserTypeEnum, UserTypeListEnum } from 'src/app/enums/generals.enum';
import { UserModel } from 'src/app/models/user.model';
import { GetListUsersModel } from '../../models/filter-user.model';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { UsersService } from '../../services/users.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { cleanObject } from 'src/app/shared/functions/general-functions';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUserComponent } from '../../dialogs/create-update-user/create-update-user.component';
import { ResponseApi } from 'src/app/models/response.model';
import { ChangePasswordUserComponent } from '../../dialogs/change-password-user/change-password-user.component';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {
  form: FormGroup
  keyFormName = 'name';
  keyFormUserType = 'userType';
  keyFormStatus = 'status';

  userTypeList = UserTypeListEnum();
  userStatusList = UserStatusListEnum();

  limit: number = 10;
  page: number = 1;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'status',
    'id', 
    'name', 
    'email',
    'userType',
    'actions'
  ];

  listUsers: UserModel [] = []; 
  dataSource = new MatTableDataSource<UserModel>();

  rolAdmin = UserTypeEnum.ADMIN;

  constructor(
    private dialogService: DialogsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private messagesService: MessagesService
  ) { 
    this.form = new FormGroup({
      [`${this.keyFormName}`]: new FormControl(''),
      [`${this.keyFormUserType}`]: new FormControl(''),
      [`${this.keyFormStatus}`]: new FormControl(UserStatusEnum.ALL)
    })
  }

  ngOnInit(): void {
    this.getListUsers();
  }

  buildRequestBody(): GetListUsersModel {
    const offset = (this.page - 1) * this.limit;
    const data: GetListUsersModel = this.form.value;
    data.offset = offset;
    data.limit = this.limit;
    return data;
  }

  getListUsers(){
    const body = cleanObject(this.buildRequestBody());
      this.dialogService.showDialogLoading();
      this.usersService.getListUsers(body).subscribe({
        next: res=>{
          if(res.statusCode === ResponseTypeEnum.OK){
            this.dialogService.closeDialogLoading();
            this.listUsers = res.result.results;
            this.dataSource.data = this.listUsers;
            this.totalItems = res.result.total;
          }
        },
        error: _ => this.dialogService.closeDialogLoading()
      });
  }

   onPageChange(newPage: number) {
    this.page = newPage;
    this.getListUsers();
  }

  resetForm() {
    this.form.reset();
    this.form.get(this.keyFormStatus)?.setValue(UserStatusEnum.ALL);
    this.page = 1;
    this.getListUsers();
  }

  dialogCreateOrUpdateUser(){
    return this.dialog.open(CreateUpdateUserComponent, {
      width: '40%',
      height: 'auto',
      disableClose: true,
      autoFocus: false
    });
  }

  showDialogCreateUser(){
    const refDialog = this.dialogCreateOrUpdateUser();
    refDialog.afterClosed().subscribe(res=>{
      if(res){
        this.onPageChange(1);
      }
    })
  }

  showDialogUpdateUser(id: number){
    const refDialog = this.dialogCreateOrUpdateUser();
    refDialog.componentInstance.id = id;
    refDialog.afterClosed().subscribe(res=>{
      if(res){
        this.onPageChange(1);
      }
    })
  }

  disableUser(id: number){
    this.showEnableOrDisableUserDialog(
      'Deshabilitar usuario',
      '¿Estás seguro de que deseas deshabilitar este usuario?',
      ( ) => this.requestDisableUser(id)
    );
  }

  enableUser(id: number){
    this.showEnableOrDisableUserDialog(
      'Habilitar usuario',
      '¿Deseas habilitar nuevamente este usuario?',
      () => this.requestEnableUser(id)
    );
  }

  showEnableOrDisableUserDialog(
    title: string,
    message: string,
    onConfirm: () => void
  ) {
    const dialogRef = this.dialogService.showDialogConfirm(title, message);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      onConfirm();
      }
    });
  }

  requestDisableUser(id: number){
    this.usersService.disableUser(id).subscribe({
      next: res=>{
       this.proccessResponseEnableOrDisableUse(res);
      }
    })
  }

  requestEnableUser(id: number){
    this.usersService.enableUser(id).subscribe({
      next: res=>{
        this.proccessResponseEnableOrDisableUse(res);
      }
    })
  }

  proccessResponseEnableOrDisableUse(res: ResponseApi){
    if(res.statusCode === ResponseTypeEnum.OK){
      this.messagesService.showSuccess(res.friendlyMessage[0]);
      this.onPageChange(1);
    }
  }

  showDialogChangePassword(data: UserModel){
    const refDialog = this.dialog.open(ChangePasswordUserComponent,{
      width: '40%',
      height: 'auto',
      disableClose: true,
      autoFocus: false
    });
    refDialog.componentInstance.dataUser = data;
    refDialog.afterClosed().subscribe(res=>{
      if(res){
        this.onPageChange(1);
      }
    });
  }

}
