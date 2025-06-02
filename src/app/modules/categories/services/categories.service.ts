import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { GetListBaseModel } from 'src/app/models/get-list-base.model';
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
    )
  }
}
