import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username : string = '';
  password : string = '';
  errorMessage : string = '';
  
  constructor(private router : Router, private authService : AuthenticationService) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: response => {
          // sets isLoggedIn and currentUser
          this.authService.isLoggedIn = true;
          const userId = response['userId'];
          const username = response['username'];
          this.authService.currentUser = { userId, username };
          // routes user back to homepage
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
    });
  }
}
