import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { GetListBaseModel } from 'src/app/models/base-models/get-list-base.model';
import { CategoryModel } from 'src/app/models/category.model';
import { ResponseApi } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getListCategories(body: GetListBaseModel):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.category),
      body
    );
  }

  createCategory(body: CategoryModel): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.categoryCreate),
      body
    );
  }

  getCategoryById(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(
      getFullEndpoint(EndpointsPaths.getCategoryById, [id.toString()])
    )
  };

  updateCategory(body: CategoryModel): Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.categoryUpdate),
      body
    )
  }

  deleteCategory(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(
      getFullEndpoint(EndpointsPaths.categoryDeleteId, [id.toString()])
    )
  }
}
