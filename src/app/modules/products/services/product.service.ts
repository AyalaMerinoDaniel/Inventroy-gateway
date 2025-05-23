import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { GetListBaseModel } from 'src/app/models/get-list-base.model';
import { ResponseApi } from 'src/app/models/response.model';
import { CreateOrUpdateProductModel } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getListProducts(body: GetListBaseModel):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.product),
      body
    )
  }

  createProduct(body: CreateOrUpdateProductModel):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.productCreate),
      body
    )
  }

  getProductById(id: number){
    return this.http.get<ResponseApi>(
      getFullEndpoint(EndpointsPaths.getProductById, [id.toString()])
    )
  }

  updateProduct(body: CreateOrUpdateProductModel):Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.productUpdate),
      body
    )
  }
}
