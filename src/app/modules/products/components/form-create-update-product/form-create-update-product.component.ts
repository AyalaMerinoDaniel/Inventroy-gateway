import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';

@Component({
  selector: 'app-form-create-update-product',
  templateUrl: './form-create-update-product.component.html',
  styleUrls: ['./form-create-update-product.component.scss']
})
export class FormCreateUpdateProductComponent implements OnInit {
  formProduct: FormGroup;

  keyFormName = 'name';
  keyFormdescription = 'description';
  keyFormPrice = 'price';
  keyFormCategoryId = 'categoryId';
  keyFormStock = 'stock';

  endpoint = getFullEndpoint(EndpointsPaths.categorySelector);

  constructor() {
    this.formProduct = new FormGroup({
      [`${this.keyFormName}`]: new FormControl('', Validators.required),
      [`${this.keyFormdescription}`]: new FormControl('',Validators.required),
      [`${this.keyFormPrice}`]: new FormControl(null, Validators.required),
      [`${this.keyFormCategoryId}`]: new FormControl('',Validators.required),
      [`${this.keyFormStock}`]: new FormControl('',Validators.required),
    })
   }

  ngOnInit(): void {
  }

}
