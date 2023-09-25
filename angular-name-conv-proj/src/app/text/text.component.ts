import { Component, OnInit } from '@angular/core';
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
  isLoggedIn : boolean;
  username? : string;
  userId? : number

  convention : string = 'camel-case';
  inputData : string = '';
  outputData : string= '';

  message? : string;

  constructor(private router : Router, private conversionService: ConversionService, private authService : AuthenticationService, private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.username = this.authService.currentUser?.username;
  }

  // converts text when input changes
  onTextInput() {
    this.message = '';
    this.conversionService.convertText(this.inputData, this.convention)
      .subscribe(response => {
        this.outputData = response
      });
  } 

  // re converts text if convention changes
  onConvChange() {
    this.onTextInput();
  }

  // add item to favorites
  onFavorite() {
    // redirect to login page if not logged in
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } 
    else {
      this.favoriteService.addFavorite(this.authService.currentUser.userId, this.inputData, this.outputData)
        .subscribe({
          next : (response) => { 
            this.message = response;
          },
          error : (error) => { 
            this.message = error.error;
          }
        });
    }
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
