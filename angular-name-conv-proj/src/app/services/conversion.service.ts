import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private url = 'http://127.0.0.1:5000/';

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  convertText(text : string, conv : string) : Observable<any> {
    return this.http.post(this.url, { text , conv }, this.httpOptions)
  }
}
