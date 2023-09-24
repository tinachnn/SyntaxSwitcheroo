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

  login(username : string, password : string) : Observable<any> {
    return this.httpService.postData('http://127.0.0.1:5000/api/login', { username, password })
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
