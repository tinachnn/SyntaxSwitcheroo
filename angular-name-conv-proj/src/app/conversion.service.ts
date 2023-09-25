import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor(private http : HttpClient) { }

  convertText(data : any) : Observable<any> {
    const url = 'http://127.0.0.1:5000/';
    return this.http.post(url, data)
  }
}
