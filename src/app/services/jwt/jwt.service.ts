import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwt = new JwtHelperService();

  constructor() { }

  decodeToken(token: string) {
    return this.jwt.decodeToken(token);
  }

  isTokenExpired(token: string): boolean {
    return this.jwt.isTokenExpired(token);
  }
  
}
