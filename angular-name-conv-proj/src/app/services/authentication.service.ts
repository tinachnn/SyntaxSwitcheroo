import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn : boolean = false;
  currentUser : any = null;

  constructor( private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createUser(username : string, password : string ) : Observable<any> {
    const url = environment.SERVER_URL + '/create';
    return this.http.post(url, { username , password }, this.httpOptions);
  }

  login(username : string, password : string) : Observable<any> {
    const url = environment.SERVER_URL + '/login';
    return this.http.post(url, { username, password }, this.httpOptions);
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
