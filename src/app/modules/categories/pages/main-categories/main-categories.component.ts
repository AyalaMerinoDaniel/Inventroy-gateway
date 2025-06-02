import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { GetListBaseModel } from 'src/app/models/base-models/get-list-base.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateCategoryDialogComponent } from '../../dialogs/create-update-category-dialog/create-update-category-dialog.component';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss'],
})
export class MainCategoriesComponent implements OnInit {
  form: FormGroup;
  keyFormNameCategory = 'nameCategory';

  limit: number = 10;
  page: number = 1;
  totalItems: number = 0;

  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    'actions'
  ];

  listCategories: CategoryModel [] = []; 
  dataSource = new MatTableDataSource<CategoryModel>();
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private dialogService: DialogsService,
    private messageService: MessagesService
  ) {
    this.form = this.fb.group({
      [`${this.keyFormNameCategory}`]: [''],
    });
  }

  ngOnInit(): void {
    this.getListCategories();
  }

  getData(): GetListBaseModel{
    const nameCategory = this.form.get(this.keyFormNameCategory)?.value;
    var offset = (this.page - 1) * this.limit;
    const body: GetListBaseModel = {
      limit: this.limit,
      offset: offset,
      value: nameCategory
    }
    return body;
  }

  getListCategories(){
    const body = this.getData();
    this.categoriesService.getListCategories(body).subscribe(res=>{
      if(res.statusCode === 200){
        this.listCategories = res.result.results;
        this.dataSource.data = this.listCategories;
        this.totalItems = res.result.total;
      }
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getListCategories();
  }

  resetForm() {
    this.form.reset();
    this.page = 1;
    this.getListCategories();
  }

  showDialogCreateUpdateCategory(idCategory?: number){
    const dialogRef = this.dialog.open(CreateUpdateCategoryDialogComponent,{
     width: '40%',
     height: 'auto',
     disableClose: true,
     autoFocus: false
    });
    dialogRef.componentInstance.idCategory = idCategory;
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.onPageChange(1);
      }
    });
  }

  showDialogDeleteCategory(category: CategoryModel){
    const message = `¿Estás seguro que desea eliminar la categoría ${category.name}?`;
    const ref = this.dialogService.showDialogConfirm('Eliminar Categoría', message);
    ref.afterClosed().subscribe(res=>{
      if(res){
        this.requestDeleteCategory(category.id ?? 0)
      }
    });
  }

  requestDeleteCategory(id: number){
  this.categoriesService.deleteCategory(id).subscribe(res=>{
    if(res.statusCode === ResponseTypeEnum.OK){
      this.messageService.showSuccess(res.friendlyMessage[0]);
      this.onPageChange(1);
    }
  })
}
}
