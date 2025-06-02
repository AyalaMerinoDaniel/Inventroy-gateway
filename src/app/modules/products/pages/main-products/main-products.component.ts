import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetListBaseModel } from 'src/app/models/base-models/get-list-base.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductLIstModel } from '../../models/products.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateproductDialogComponent } from '../../dialogs/create-updateproduct-dialog/create-updateproduct-dialog.component';
import { DialogsService } from 'src/app/services/dialogs-service/dialogs.service';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { ResponseTypeEnum } from 'src/app/enums/response-type';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit {
  form: FormGroup;
  keyFormNameProduct = 'nameProduct';

  limit: number = 10;
  page: number = 1;
  totalItems: number = 0;

  listProducts: ProductLIstModel [] = []; 
  dataSource = new MatTableDataSource<ProductLIstModel>();
  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    'price',
    'category',
    'actions'
  ];
  
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private dialogService: DialogsService,
    private messageService: MessagesService
  ) { 
    this.form = this.fb.group({
      [`${this.keyFormNameProduct}`]: ['']
    })
  }

  ngOnInit(): void {
    this.getListProducts();
  }

  getDataModel(): GetListBaseModel{
    const nameProduct = this.form.get(this.keyFormNameProduct)?.value;
    var offset = (this.page - 1) * this.limit;
    const body :  GetListBaseModel = {
      limit: this.limit,
      offset: offset,
      value: nameProduct
    }

    return body;
  }

  getListProducts(){
    const body = this.getDataModel();
    this.dialogService.showDialogLoading();
    this.productService.getListProducts(body).subscribe({
      next: res=>{
        if(res.statusCode === ResponseTypeEnum.OK){
          this.dialogService.closeDialogLoading()
          this.listProducts = res.result.results;
          this.dataSource.data = this.listProducts;
          this.totalItems = res.result.total
        }
      },
      error: _ => this.dialogService.closeDialogLoading()
    })
  }

onPageChange(newPage: number) {
  this.page = newPage;
  this.getListProducts();
}

onLimitChange(newLimit: number) {
  this.limit = newLimit;
  this.page = 1;
  this.getListProducts();
}

resetForm(){
  this.form.reset();
  this.page = 1;
  this.getListProducts();
}

showDialogCreateOrUpdateProduct(id?: number){
  const ref = this.matDialog.open(CreateUpdateproductDialogComponent, {
    width: '40%',
    height: 'auto',
    disableClose: true
  });
  ref.componentInstance.idProduct = id;
  ref.afterClosed().subscribe(res=>{
    if(res){
     this.onPageChange(1);
    }
  });
}

deleteProduct(product: ProductLIstModel){
  const message = `¿Estás seguro que desea eliminar el producto ${product.name}?`
  const ref = this.dialogService.showDialogConfirm('Eliminar Producto', message);
  ref.afterClosed().subscribe(res=>{
    if(res){
      this.requestDeleteProduct(product.id ?? 0)
    }
  });
}

requestDeleteProduct(id: number){
  this.productService.deleteProduct(id).subscribe({
    next: res=>{
      if(res.statusCode === ResponseTypeEnum.OK){
        this.messageService.showSuccess(res.friendlyMessage[0]);
        this.onPageChange(1);
      }
    }
  })
}
}
