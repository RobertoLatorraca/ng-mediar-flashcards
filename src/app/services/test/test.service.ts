import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  public save(type: string, search: string, size: number): Observable<any> {
    return this.http.post(Url.TEST_ENDPOINT +
      "?type=" + type +
      "&search=" + search +
      "&size=" + size,
      null);
  }

}
