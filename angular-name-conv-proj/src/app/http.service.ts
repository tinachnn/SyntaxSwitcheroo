import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private messageService : MessageService) { }

  private log(message: string) {
    this.messageService.add(`HttpService: ${message}`);
  }

  getData(url : string) : Observable<any> {
    return this.http.get(url)
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postData(url : string, data : any) : Observable<any> {
    this.log(`Posting data to backend`)
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Posted data`))
      )
  }
}
