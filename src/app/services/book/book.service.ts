import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public save(book: Book): Observable<Book> {
    return this.http.post(Url.BOOKS_ENDPOINT, book )
      .pipe(
        map(resp => resp as Book)
      );
  }

  public findAll(): Observable<Book[]> {
    return this.http.get(Url.BOOKS_ENDPOINT)
      .pipe(
        map(resp => resp as Book[])
      );
  }

  public findAllEnabled(): Observable<any> {
    return this.http.get(Url.BOOKS_ENDPOINT).pipe(
      map(resp => resp as Book[]),
      map(books => books.filter(b => b.enabled))
    );
  }

  public findById(id: string): Observable<Book> {
    return this.http.get(Url.BOOKS_ENDPOINT + "/" + id)
      .pipe(
        map(resp => resp as Book)
      );
  }

}
