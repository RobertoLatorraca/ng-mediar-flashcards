import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveAuthorizationToken(jwtToken: string): void {
    this.deleteAuthorizationToken();
    window.localStorage.setItem("Authorization", jwtToken);
  }

  public saveRefreshToken(refreshToken: string): void {
    this.deleteRefreshToken();
    window.localStorage.setItem("Refresh-Token", refreshToken);
  }

  public getAuthorizationToken(): string | null {
    return window.localStorage.getItem("Authorization");
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem("Refresh-Token");
  }

  public deleteAuthorizationToken(): void {
    window.localStorage.removeItem("Authorization");
  }

  public deleteRefreshToken(): void {
    window.localStorage.removeItem("Refresh-Token");
  }

}
