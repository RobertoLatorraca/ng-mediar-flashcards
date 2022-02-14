import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module } from 'src/app/models/module';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Module[]> {
    return this.http.get(Url.MODULES_ENDPOINT)
      .pipe(map(response => response as Module[]));
  }

  public findAllEnabled(): Observable<Module[]> {
    return this.http.get(Url.MODULES_ENDPOINT).pipe(
      map(resp => resp as Module[]),
      map(modules => modules.filter(m => m.enabled))
    )
  }

}
