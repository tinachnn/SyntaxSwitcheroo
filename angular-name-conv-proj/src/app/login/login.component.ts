import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string = '';
  password : string = '';
  constructor(private http : HttpClient, private location : Location, private authService : AuthenticationService, private messageService : MessageService) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe( response => {
        this.messageService.add(response.message);
        if (response.message == "Login successful") {
          this.authService.isLoggedIn = true;
          this.location.back();
        }
      }
    )
  }
}
