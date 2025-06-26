import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { ResponseApi } from 'src/app/models/response.model';
import { GetListUsersModel } from '../models/filter-user.model';
import { UserModel } from 'src/app/models/user.model';
import { ChangePasswordModel } from '../models/change-password-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getListUsers(body: GetListUsersModel): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersAll),
      body
    )
  }

  createUser(body: UserModel): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersCreate),
      body
    )
  }

  getUserById(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(
      getFullEndpoint(EndpointsPaths.getUserById, [id.toString()])
    )
  }

  updateUser(body: UserModel): Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersUpdate),
      body
    )
  }

  disableUser(id: number): Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersdisableId, [id.toString()]),
      {}
    )
  }

  enableUser(id: number): Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersEnableId, [id.toString()]),
      {}
    )
  }

  changePassword(body: ChangePasswordModel): Observable<ResponseApi>{
    return this.http.patch<ResponseApi>(
      getFullEndpoint(EndpointsPaths.usersPasswordChange),
      body
    )
  }

}
