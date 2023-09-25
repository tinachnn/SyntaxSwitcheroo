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
    const url = `http://127.0.0.1:5000/api/get_favorites/${id}`;
    return this.http.get(url);
  }

  addFavorite(id : number, input : string, output : string) : Observable<any>  {
    const url = `http://127.0.0.1:5000/api/add_favorite/${id}`;
    return this.http.post(url, { input , output });
  }

  deleteFavorite(id : number, index : number) : Observable<any> {
    const url = `http://127.0.0.1:5000/api/delete_favorite/${id}/${index}`;
    return this.http.delete(url);
  }
}
