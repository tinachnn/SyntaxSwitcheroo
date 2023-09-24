import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private httpService : HttpService) { }

  login(username : string, password : string) : Observable<any> {
    return this.httpService.postData('http://127.0.0.1:5000/api/login', { username, password })
  }
}
