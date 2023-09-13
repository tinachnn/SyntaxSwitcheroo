import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  getText() : Observable<string> {
    return this.http.get(this.url, { responseType: 'text' })
  }
}
