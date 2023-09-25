import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpService } from './http.service';

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
    const url = 'http://127.0.0.1:5000/api/create';
    return this.http.post(url, { username , password }, this.httpOptions);
  }

  login(username : string, password : string) : Observable<any> {
    const url = 'http://127.0.0.1:5000/api/login';
    return this.http.post(url, { username, password }, this.httpOptions);
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
