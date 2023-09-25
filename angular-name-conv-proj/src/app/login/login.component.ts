import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string = '';
  password : string = '';
  constructor(private http : HttpClient, private router : Router, private authService : AuthenticationService) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe( response => {
        if (response.message == "Login successful") {
          this.authService.isLoggedIn = true;
          const user = response.user;
          this.authService.currentUser = { 
            'userId' : user['userId'], 
            'username' : user['username'] 
          };
          this.router.navigate(['/']);
        }
      }
    )
  }
}
