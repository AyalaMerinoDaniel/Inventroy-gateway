import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { LocalStorageKeys } from 'src/app/enums/local-storage-keys';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from 'src/app/models/response.model';
import { EndpointsPaths, getFullEndpoint } from 'src/app/endpoints/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  getAccessToken(): string | null {
    return this.localStorageService.getData(LocalStorageKeys.AccessToken); 
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getData(LocalStorageKeys.RefreshToken);
  }

  setTokens(token: string, refreshToken: string): void {
    this.localStorageService.setData(LocalStorageKeys.AccessToken, token);
    this.localStorageService.setData(LocalStorageKeys.RefreshToken, refreshToken);
  }

  clearTokens(): void {
    this.localStorageService.remove(LocalStorageKeys.AccessToken);
    this.localStorageService.remove(LocalStorageKeys.RefreshToken);
  }

  logout() {
    this.localStorageService.clear();
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


}
