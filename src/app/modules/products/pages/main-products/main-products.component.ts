import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetListBaseModel } from 'src/app/models/get-list-base.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from '../../models/products.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit {

  limit: number = 10;
  page: number = 1;
  value: string = "";
  totalItems: number = 0;

  listProducts: ProductModel [] = []; 
  dataSource = new MatTableDataSource<ProductModel>();
  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    'price',
    'category',
    'actions'
  ];
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts(){
    var offset = (this.page - 1) * this.limit;
    const body :  GetListBaseModel = {
      limit: this.limit,
      offset: offset,
      value: this.value
    }
    this.productService.getListProducts(body).subscribe(res=>{
      if(res.statusCode === 200){
        this.listProducts = res.result.results;
        this.dataSource.data = this.listProducts;
        this.totalItems = res.result.total
      }
    })
  }

  onPageChange(event: PageEvent){
  this.limit = event.pageSize;
  this.page = event.pageIndex + 1;
  this.getListProducts();
}


}
