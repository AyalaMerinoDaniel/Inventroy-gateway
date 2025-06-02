import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-create-update-category',
  templateUrl: './form-create-update-category.component.html',
  styleUrls: ['./form-create-update-category.component.scss'],
})
export class FormCreateUpdateCategoryComponent implements OnInit {
  form: FormGroup;

  keyFormName = 'name';
  keyFormDescription = 'description';

  constructor() {
    this.form = new FormGroup({
      [`${this.keyFormName}`]: new FormControl('', Validators.required),
      [`${this.keyFormDescription}`]: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
}
