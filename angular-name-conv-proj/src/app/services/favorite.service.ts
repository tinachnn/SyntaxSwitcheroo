import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFavorites(id : number) : Observable<any> {
    const url = `http://127.0.0.1:5000/api/get_data/${id}`;
    return this.http.get(url);
  }

  addFavorite(id : number, data : any)  : Observable<any>  {
    const url = `http://127.0.0.1:5000/api/post_data/${id}`;
    return this.http.post(url, data);
  }

  deleteFavorite(id : number, index : number) {
    const url = `http://127.0.0.1:5000/api/delete_data/${id}/${index}`;
    return this.http.delete(url);
  }
}
