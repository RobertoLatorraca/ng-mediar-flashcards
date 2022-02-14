import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<User[]> {
    return this.http.get(Url.USERS_ENDPOINT)
      .pipe(
        map(resp => resp as User[])
      );
  }
}
