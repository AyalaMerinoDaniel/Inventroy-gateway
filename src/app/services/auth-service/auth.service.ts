import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { LocalStorageKeys } from 'src/app/enums/local-storage-keys';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from 'src/app/models/response.model';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from 'src/app/modules/login/models/login.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserModel | undefined>(undefined);
  public user = this.userSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient
  ) { 
    const storedUser = this.getUser();
    if (storedUser) {
      this.userSubject.next(storedUser);
    }
  }

  getAccessToken(): string | undefined {
    return this.localStorageService.getData<string>(LocalStorageKeys.AccessToken); 
  }

  getRefreshToken(): string | undefined {
    return this.localStorageService.getData<string>(LocalStorageKeys.RefreshToken);
  }

  setTokens(token: string, refreshToken: string) {
    this.localStorageService.setData(LocalStorageKeys.AccessToken, token);
    this.localStorageService.setData(LocalStorageKeys.RefreshToken, refreshToken);
  }

  setUser(user: UserModel){
    this.localStorageService.setData(LocalStorageKeys.User, user);
    this.userSubject.next(user);
  }

  getUser(): UserModel | undefined{
    const user = this.localStorageService.getData<UserModel>(LocalStorageKeys.User);
    if(user){
      return user;
    }else{
      return undefined;
    }
  }

  clearTokens() {
    this.localStorageService.remove(LocalStorageKeys.AccessToken);
    this.localStorageService.remove(LocalStorageKeys.RefreshToken);
  }

  logout() {
    this.localStorageService.clear();
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<ResponseApi> {
  const refreshToken = this.getRefreshToken();
  const body = {
    refreshToken: refreshToken
  }
  return this.http.post<ResponseApi>(
    getFullEndpoint(EndpointsPaths.authRefresh),
    body
  );
}

login(body: LoginModel): Observable<ResponseApi>{
  return this.http.post<ResponseApi>(
    getFullEndpoint(EndpointsPaths.authLogin),
    body
  );
}


}
