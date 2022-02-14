import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { JwtService } from '../services/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService,
    private jwtService: JwtService,
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken: string | null = this.tokenStorageService.getAuthorizationToken();
    const refreshToken: string | null = this.tokenStorageService.getRefreshToken();
    let reqClone = req;
    
    console.log("in interceptor");

    if (jwtToken != null && !this.jwtService.isTokenExpired(jwtToken)) {
      console.log("in if jwt token");
      reqClone = req.clone({
        setHeaders: {
          Authorization: jwtToken
        }
      });
      return next.handle(reqClone);

    }
    return next.handle(reqClone);

    /*.pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return throwError(err);
        }
        return throwError(err)
      })
    );*/
  }

  private handleJwtTokenExpired() {
      console.log("HOLA MIND");
    }

}
