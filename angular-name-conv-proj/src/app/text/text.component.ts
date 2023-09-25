import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConversionService } from '../services/conversion.service';
import { AuthenticationService } from '../services/authentication.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  isLoggedIn : boolean = false;
  username? : string;

  convention : string = 'camel-case';
  inputData? : string;
  outputData? : string;

  message? : string;

  constructor(private conversionService: ConversionService, private authService : AuthenticationService, private favoriteService : FavoriteService, private router : Router) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.username = this.authService.currentUser?.username;
  }
  
  onTextInput() {
    this.message = '';
    if (this.inputData) {
      this.conversionService.convertText(this.inputData, this.convention)
        .subscribe(response => {
          this.outputData = response
        });
    }
  } 

  // converts text again if convention changes
  onConvChange() {
    this.onTextInput();
  }

  saveData() {
    // redirect to login page if not logged in
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } 
    // add to favorites
    else {
      this.favoriteService.addFavorite(this.authService.currentUser.userId, this.inputData, this.outputData)
        .subscribe({
          next : (response) => { 
            this.message = response.message;
          },
          error : (error) => { 
            this.message = error.error;
          }
        })
    };
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
