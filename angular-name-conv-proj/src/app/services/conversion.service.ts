import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private url : string = environment.SERVER_URL + '/convert';

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  convertText(text : string, conv : string) : Observable<any> {
    return this.http.post(this.url, { text , conv }, this.httpOptions);
  }
}
