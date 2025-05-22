import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() {
    this.formProduct = new FormGroup({
      [`${this.keyFormName}`]: new FormControl(''),
      [`${this.keyFormdescription}`]: new FormControl(''),
      [`${this.keyFormPrice}`]: new FormControl(''),
      [`${this.keyFormCategoryId}`]: new FormControl(''),
    })
   }

  ngOnInit(): void {
  }

}
