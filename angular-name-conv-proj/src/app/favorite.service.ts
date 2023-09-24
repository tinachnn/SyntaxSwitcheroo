import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFavorites() : Observable<any> {
    const url = 'http://127.0.0.1:5000/api/get_data';
    return this.http.get(url);
  }

  addFavorite(data : any)  : Observable<any>  {
    const url = 'http://127.0.0.1:5000/api/post_data';
    return this.http.post(url, data);
  }

  deleteFavorite() {

  }
}
