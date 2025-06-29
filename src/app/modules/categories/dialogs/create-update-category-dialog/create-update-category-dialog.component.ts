import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormCreateUpdateCategoryComponent } from '../../components/form-create-update-category/form-create-update-category.component';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { CategoriesService } from '../../services/categories.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ResponseApi } from 'src/app/models/response.model';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { UserTypeEnum } from 'src/app/enums/generals.enum';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-create-update-category-dialog',
  templateUrl: './create-update-category-dialog.component.html',
  styleUrls: ['./create-update-category-dialog.component.scss']
})
export class CreateUpdateCategoryDialogComponent implements OnInit {
  @ViewChild('formCategory', { static: true }) formCategoryComponent!: FormCreateUpdateCategoryComponent;

  titleDialog: string = 'Crear categoría'
  textButton: string = 'Guardar'
  idCategory?: number;

  rolAdmin = UserTypeEnum.ADMIN;

  constructor(
    private dialogRef: MatDialogRef<CreateUpdateCategoryDialogComponent>,
    private messagesService: MessagesService,
    private categoriesService: CategoriesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.idCategory){
      this.categoriesService.getCategoryById(this.idCategory).subscribe(res=>{
        if(res.statusCode === ResponseTypeEnum.OK){
          const category: CategoryModel = res.result;
          this.setDetailToForm(category);
          this.disableFieldToPermissions();
        }
      });
    }
  }

  setDetailToForm(data: CategoryModel){
    this.formCategoryComponent.form.patchValue(data);
    this.titleDialog = 'Actualizar categoría';
    this.textButton = 'Actualizar';
  }

  disableFieldToPermissions(){
    const userRole = this.authService.getUser()?.role;
    const form = this.formCategoryComponent.form;
    if(userRole !== this.rolAdmin){
      form.get(this.formCategoryComponent.keyFormDescription)?.disable();
      form.get(this.formCategoryComponent.keyFormName)?.disable();
    }
  }

  onSubmitForm(){
    const form = this.formCategoryComponent.form;
    if(form.valid){
      const data: CategoryModel = form.value;
      if(this.idCategory){
        data.id = this.idCategory;
        this.updateCategory(data);
      }else{
        this.createCategory(data);
      }
    }else{
      this.messagesService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
      form.markAllAsTouched();
    }
  }

  createCategory(body: CategoryModel){
    this.categoriesService.createCategory(body).subscribe(res=>{
      this.responseData(res);
    }); 
  }

  updateCategory(body: CategoryModel){
    this.categoriesService.updateCategory(body).subscribe(res=>{
      this.responseData(res);
    }); 
  }

  responseData(res: ResponseApi){
    if(res.statusCode === ResponseTypeEnum.OK){
      this.messagesService.showSuccess(res.friendlyMessage[0]);
      this.dialogRef.close(true);
    }
  }

}
