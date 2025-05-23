import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreateUpdateProductComponent } from '../../components/form-create-update-product/form-create-update-product.component';
import {
  CreateOrUpdateProductModel,
  ProductLIstModel,
} from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateUpdateproductDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.idProduct) {
      this.productService.getProductById(this.idProduct).subscribe((res) => {
        if (res.statusCode === 200) {
          const data: ProductLIstModel = res.result;
          this.setFormDetails(data);
        }
      });
    }
  }

  mapProductToFormData(product: ProductLIstModel) {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.category
      ? { id: product.category.id, value: product.category.name }
      : null,
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
      formProduct.markAllAsTouched();
    }
  }

  requestCreateProduct(body: CreateOrUpdateProductModel){
    this.productService.createProduct(body).subscribe((res) => {
      if (res.statusCode === 200) {
          this.dialogRef.close();
      }
    });
  }

  requestUpdateProduct(body: CreateOrUpdateProductModel){
    this.productService.updateProduct(body).subscribe((res) => {
      if (res.statusCode === 200) {
          this.dialogRef.close();
      }
    });
  }
}
