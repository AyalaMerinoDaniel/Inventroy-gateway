import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  switchMap,
  take,
} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MessagesService } from 'src/app/services/message-service/messages.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private messageService: MessagesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const authReq = token ? this.addToken(req, token) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const isLoginRequest = req.url.includes('/auth/login');

          if (isLoginRequest) {
            this.messageService.showError('Credenciales inválidas');
            return throwError(() => error);
          }
          return this.handleUnauthorized(req, next);
        }
        if (error.status === 500) {
          this.messageService.showError('Error en el sistema, consulta con el administrador.')
        }
        if (error.status === 400) {
          const messages = error.error.friendlyMessage;
          this.messageService.showWarning(messages.join('; '));
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private handleUnauthorized(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authService.getRefreshToken()) {
      this.authService.logout();
      this.messageService.showError('Por favor inicie sesión.')
    }

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          const newToken = response.result.accessToken;
          const newRefreshToken = response.result.refreshToken;
          if (newToken) {
            this.tokenSubject.next(newToken);
            this.authService.setTokens(newToken, newRefreshToken)
            return next.handle(this.addToken(req, newToken));
          }
          
          this.messageService.showError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          this.authService.logout();
          return throwError(() => 'Token expired');
        }),
        catchError((err) => {
          this.authService.logout();
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => next.handle(this.addToken(req, token!)))
      );
    }
  }
}
