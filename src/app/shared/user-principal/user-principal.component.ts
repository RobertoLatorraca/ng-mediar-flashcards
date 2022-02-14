import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-user-principal',
  templateUrl: './user-principal.component.html',
  styleUrls: ['./user-principal.component.scss']
})
export class UserPrincipalComponent implements OnInit {

  decodedToken!: any;
  userProvider!: string;

  constructor(private jwtService: JwtService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let jwt = this.tokenStorageService.getAuthorizationToken();
    if (jwt) {
      this.decodedToken = this.jwtService.decodeToken(jwt);
      this.userProvider = this.authService.getUserProvider()!;
    }
  }

}
