import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseFiltersModel } from '../models/purchase-filters.model';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/models/response.model';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { CreatePurchaseModel } from '../models/purchase-create-update.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  getListPurchases(body: PurchaseFiltersModel): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.purchaseAll),
      body
    )
  }

  createPurchase(body: CreatePurchaseModel):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.purchaseCreate),
      body
    )
  }

  getDetailsPurchaseById(id : number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(
      getFullEndpoint(EndpointsPaths.purchaseDetailsId, [id.toString()])
    )
  }
}
