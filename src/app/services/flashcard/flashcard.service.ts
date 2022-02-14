import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flashcard } from 'src/app/models/flashcard';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private http: HttpClient) { }

  public save(flashcard: Flashcard): Observable<Flashcard> {
    return this.http.post(Url.FLASHCARDS_ENDPOINT, flashcard)
      .pipe(
        map(resp => resp as Flashcard)
      );
  }

  public findAll(): Observable<Flashcard[]> {
    return this.http.get(Url.FLASHCARDS_ENDPOINT)
      .pipe(
        map(resp => resp as Flashcard[])
      );
  }

  public findById(id: string): Observable<Flashcard> {
    return this.http.get(Url.FLASHCARDS_ENDPOINT + "/" + id)
      .pipe(
        map(resp => resp as Flashcard)
      );
  }

}
