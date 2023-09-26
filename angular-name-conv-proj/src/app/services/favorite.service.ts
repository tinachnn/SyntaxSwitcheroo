import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    const url = environment.SERVER_URL + `/get_favorites/${id}`;
    return this.http.get(url);
  }

  addFavorite(id : number, input : string, output : string, convention : string) : Observable<any>  {
    const url = environment.SERVER_URL + `/add_favorite/${id}`;
    return this.http.post(url, { input , output, convention });
  }

  deleteFavorite(id : number, index : number) : Observable<any> {
    const url = environment.SERVER_URL + `/delete_favorite/${id}/${index}`;
    return this.http.delete(url);
  }
}
