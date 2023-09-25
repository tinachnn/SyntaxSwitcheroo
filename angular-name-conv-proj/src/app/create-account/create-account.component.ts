import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  constructor(private router : Router, private authService : AuthenticationService) {}
  username : string = '';
  // email : string = '';
  password : string = '';
  // firstName : string = '';
  // lastName : string = '';
  // birthdate : string = '';

  onSubmit() {
    this.authService.createUser(this.username, this.password)
      .subscribe(response => {
        if (response.message == "Account created successfully") {
          this.authService.isLoggedIn = true;
          const user = response.user;
          this.authService.currentUser = { 
            'userId' : user['userId'], 
            'username' : user['username'] 
          };
          this.router.navigate(['/']);
        }
      })
  }
}
