import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';
import { Url } from 'src/app/url/url';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  public save(topic: Topic): Observable<Topic> {
    return this.http.post(Url.TOPICS_ENDPOINT, topic )
      .pipe(
        map(response => response as Topic)
      );
  }

  public findAll(): Observable<Topic[]> {
    return this.http.get(Url.TOPICS_ENDPOINT)
      .pipe(
        map(response => response as Topic[])
      );
  }

  public findAllEnabled(): Observable<Topic[]> {
    return this.http.get(Url.TOPICS_ENDPOINT).pipe(
      map(resp => resp as Topic[]),
      map(topics => topics.filter(t => t.enabled))
    );
  }

  public findById(id: string): Observable<Topic> {
    return this.http.get(Url.TOPICS_ENDPOINT + "/" + id)
      .pipe(
        map(response => response as Topic)
      );
  }

}
