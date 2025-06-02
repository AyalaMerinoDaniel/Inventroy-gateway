import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { GetListBaseModel } from 'src/app/models/get-list-base.model';

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
    private categoriesService: CategoriesService
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

  resetForm() {
    this.form.reset();
    this.page = 1;
    this.getListCategories();
  }
}
