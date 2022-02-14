import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users!: User[];
  principalUsername!: string;

  constructor(private userService: UserService,
    private jwt: JwtService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadTableData();
    this.principalUsername = this.authService.getPrincipalUsername() || '';
  }

  loadTableData(): void {
    this.userService.findAll().subscribe(
      (resp: User[]) => this.users = resp
    );
  }

}
