import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private messageService : MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createUser(username : string, password : string ) : Observable<any> {
    const url = 'http://127.0.0.1:5000/api/create';
    this.messageService.add('UserService : Creating user')
    return this.http.post(url, { username , password })
  }
}
