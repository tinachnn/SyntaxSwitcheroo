import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private http : HttpClient, private router : Router, private authService : AuthenticationService, private messageService : MessageService) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe( response => {
        this.messageService.add(response.message);
        if (response.message == "Login successful") {
          this.authService.isLoggedIn = true;
          this.router.navigate(['/']);
          // console.log(this.location.back())
        }
      }
    )
  }
}
