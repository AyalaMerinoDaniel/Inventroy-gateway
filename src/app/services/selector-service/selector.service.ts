import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/models/response.model';
import { SelectRequestBodyModel } from 'src/app/models/selector/select-request-body.model';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor(private http: HttpClient) { }

  getListApi(url: string, limit: number, offset: number, filter: string): Observable<ResponseApi>{
    var body: SelectRequestBodyModel= {
      limit: limit,
      offset: offset,
      value: filter
    }
    return this.http.post<ResponseApi>(url, body)
  }
}
