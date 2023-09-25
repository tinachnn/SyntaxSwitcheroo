import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FavoriteService } from '../favorite.service';
import { AuthenticationService } from '../authentication.service';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-text-conversion',
  templateUrl: './text-conversion.component.html',
  styleUrls: ['./text-conversion.component.css']
})
export class TextConversionComponent {
  isLoggedIn : boolean = false;
  username? : string;
  inputConv : string = 'snake-case';
  outputConv : string = 'camel-case';
  textAreaValue? : string;
  receivedData? : string;
  constructor(private conversionService: ConversionService, private router : Router, private authService : AuthenticationService, private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      this.username = this.authService.currentUser.username;
    }
  }
  
  onChildValueChange(value : string) {
    this.outputConv = value;
  }

  sendDataToBackend() {
    const data = {
      text : this.textAreaValue,
      'convention' : this.outputConv
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
