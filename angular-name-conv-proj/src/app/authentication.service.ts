import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn : boolean = false;
  currentUser? : any = null;

  constructor( private httpService : HttpService) { }

  createUser(username : string, password : string ) : Observable<any> {
    const url = 'http://127.0.0.1:5000/api/create';
    return this.httpService.postData(url, { username , password })
  }

  login(username : string, password : string) : Observable<any> {
    const url = 'http://127.0.0.1:5000/api/login';
    return this.httpService.postData(url, { username, password })
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
