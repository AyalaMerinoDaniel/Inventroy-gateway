import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreateUpdateProductComponent } from '../../components/form-create-update-product/form-create-update-product.component';
import {
  CreateOrUpdateProductModel,
  ProductLIstModel,
} from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/message-service/messages.service';
import { GenericOption } from 'src/app/models/selector/select-request-body.model';
import { GENERAL_MESSAGES } from 'src/app/shared/constants/message.constants';
import { ResponseApi } from 'src/app/models/response.model';
import { ResponseTypeEnum } from 'src/app/enums/response-type';
import { UserTypeEnum } from 'src/app/enums/generals.enum';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-create-updateproduct-dialog',
  templateUrl: './create-updateproduct-dialog.component.html',
  styleUrls: ['./create-updateproduct-dialog.component.scss'],
})
export class CreateUpdateproductDialogComponent implements OnInit {
  @ViewChild('formProduct') form!: FormCreateUpdateProductComponent;
  idProduct?: number;
  titleDialog: string = 'Crear Producto'
  textButton: string = 'Guardar';

  rolAdmin = UserTypeEnum.ADMIN;
  
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateUpdateproductDialogComponent>,
    private messageService: MessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.idProduct) {
      this.productService.getProductById(this.idProduct).subscribe((res) => {
        if (res.statusCode === 200) {
          const data: ProductLIstModel = res.result;
          this.setFormDetails(data);
          this.disableFieldToPermissions();
        }
      });
    }
  }

  disableFieldToPermissions(){
    const userRole = this.authService.getUser()?.role;
    const form = this.form.formProduct;
    if(userRole !== this.rolAdmin){
      form.get(this.form.keyFormName)?.disable();
      form.get(this.form.keyFormdescription)?.disable();
      form.get(this.form.keyFormCategoryId)?.disable();
      form.get(this.form.keyFormPrice)?.disable()
    }
  }


  mapProductToFormData(product: ProductLIstModel): CreateOrUpdateProductModel {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.category
      ? new GenericOption(product.category.id!, product.category.name)
      : undefined,
  };
}
  setFormDetails(data: ProductLIstModel) {
    this.titleDialog = 'Actualizar Producto';
    this.textButton = 'Actualizar';
    const product = this.mapProductToFormData(data);
    this.form.formProduct.patchValue(product);
  }

  saveProduct() {
    const formProduct = this.form.formProduct;
    if (formProduct.valid) {
      const data: CreateOrUpdateProductModel = formProduct.value;
      if(this.idProduct){
        data.id = this.idProduct;
        this.requestUpdateProduct(data);
      }else{
        this.requestCreateProduct(data);
      }
    } else {
      this.messageService.showWarning(GENERAL_MESSAGES.INFORMATION_REQUIRED);
      formProduct.markAllAsTouched();
    }
  }

  requestCreateProduct(body: CreateOrUpdateProductModel){
    this.productService.createProduct(body).subscribe((res) => {
      this.responseData(res);
    });
  }

  requestUpdateProduct(body: CreateOrUpdateProductModel){
    this.productService.updateProduct(body).subscribe((res) => {
      this.responseData(res);
    });
  }

  responseData(res: ResponseApi){
    if(res.statusCode === ResponseTypeEnum.OK){
      this.messageService.showSuccess(res.friendlyMessage[0]);
      this.dialogRef.close(true);
    }
  }
}
