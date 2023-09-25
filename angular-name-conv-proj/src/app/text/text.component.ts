import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FavoriteService } from '../services/favorite.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConversionService } from '../services/conversion.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  isLoggedIn : boolean = false;
  username? : string;
  convention : string = 'camel-case';
  textAreaValue? : string;
  receivedData? : string;
  constructor(private conversionService: ConversionService, private router : Router, private authService : AuthenticationService, private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      this.username = this.authService.currentUser.username;
    }
  }
  
  onConvChange() {
    this.sendDataToBackend();
  }

  sendDataToBackend() {
    const data = {
      text : this.textAreaValue,
      'convention' : this.convention
    };

    this.conversionService.convertText(data)
      .subscribe(response => {
        this.receivedData = response.text
    });
  } 

  saveData() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } 
    else {
      const data = {
        'input' : this.textAreaValue,
        'output' : this.receivedData,
      }

      this.favoriteService.addFavorite(this.authService.currentUser.userId, data)
        .subscribe(response => {});
    }
  }

  logout() {
    this.authService.logout()
    this.isLoggedIn = false;
  }
}
