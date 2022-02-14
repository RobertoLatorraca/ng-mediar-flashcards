import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { Url } from 'src/app/url/url';
import { JwtService } from '../jwt/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  http!: HttpClient;

  constructor(
    private httpBackend: HttpBackend,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private jwtService: JwtService
    ) {
      this.http = new HttpClient(this.httpBackend);
    }

  public register(
    name: string,
    username: string,
    password: string
    ): Observable<HttpResponse<Object>> {
    return this.http.post(Url.REGISTER_AUTH, {name, username, password}, {observe: 'response'});
  }

  public signIn(username: string, password: string): Observable<HttpResponse<Object>> {
    return this.http.post(Url.SIGNIN_AUTH, {username, password}, {observe: 'response'})
      .pipe(
        map(resp => {
          if (resp.headers.get('Authorization') && resp.headers.get('Refresh-Token')) {
            this.tokenStorageService.saveAuthorizationToken(resp.headers.get('Authorization')!);
            this.tokenStorageService.saveRefreshToken(resp.headers.get('Refresh-Token')!);
            this.router.navigateByUrl('/app/dashboard');
          }
          return resp;
        })
      );
  }

  public googleSignIn(credential: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({'Google-Token': credential})
    return this.http.post(Url.GOOGLE_AUTH, {}, {headers, observe: 'response'})
      .pipe(
        map(resp => {
          if (resp.headers.get('Authorization') && resp.headers.get('Refresh-Token')) {
            this.tokenStorageService.saveAuthorizationToken(resp.headers.get('Authorization')!);
            this.tokenStorageService.saveRefreshToken(resp.headers.get('Refresh-Token')!);
            this.router.navigateByUrl('/app/dashboard');
          }
          return resp;
        })
      );
  }

  public isLoggedIn(): boolean {
    if (!this.tokenStorageService.getAuthorizationToken() ||
      !this.tokenStorageService.getRefreshToken()) return false;
    if (this.jwtService.isTokenExpired(this.tokenStorageService.getRefreshToken()!)) return false;
    return true;
  }

  public getPrincipalUsername(): string | null {
    const token = this.tokenStorageService.getAuthorizationToken();
    if (token) {
      return this.jwtService.decodeToken(token).sub;
    }
    return null;
  }

  public getUserProvider(): string | null {
    const token = this.tokenStorageService.getAuthorizationToken();
    if (token) {
      return this.jwtService.decodeToken(token).provider
    }
    return null;
  }
  
  public refreshToken(): Observable<HttpResponse<Object>>{
    const headers = new HttpHeaders({'Refresh-Token': this.tokenStorageService.getRefreshToken()!})
    return this.http.post(Url.REFRESH_TOKEN_AUTH, null, {headers, observe: 'response'})
      .pipe(
        map(resp => {
          if (resp.headers.get('Authorization') && resp.headers.get('Refresh-Token')) {
            this.tokenStorageService.saveAuthorizationToken(resp.headers.get('Authorization')!);
            this.tokenStorageService.saveRefreshToken(resp.headers.get('Refresh-Token')!);
          }
          return resp;
        })
      );
  }

  public signOut(): void {
    this.tokenStorageService.deleteAuthorizationToken();
    this.tokenStorageService.deleteRefreshToken();
    this.router.navigateByUrl('/auth/signin');
  }


}
