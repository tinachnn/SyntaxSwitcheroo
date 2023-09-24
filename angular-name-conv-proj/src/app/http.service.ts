import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient, private messageService : MessageService) { }

  private log(message: string) {
    this.messageService.add(`HttpService: ${message}`);
  }

  getData() : Observable<any> {
    return this.http.get(this.url)
      .pipe(
        // tap(_ => this.log('get data'))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // postData(data : any) : Observable<any> {
  //   // this.log(`Posting data to backend`)
  //   return this.http.post(this.url, data, this.httpOptions)
  //     .pipe(
  //       // tap(_ => this.log(`Posted data`))
  //     )
  // }

  postData(url : string, data : any) : Observable<any> {
    this.log(`Posting data to backend`)
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Posted data`))
      )
  }
}
