import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';
import { MessageService } from '../message.service';
import { FavoriteService } from '../favorite.service';
import { AuthenticationService } from '../authentication.service';

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
  constructor(private httpService: HttpService, private router : Router, private authService : AuthenticationService, private messageService : MessageService, private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      this.username = this.authService.currentUser.username;
    }
  }
  
  onChildValueChange(value : string) {
    this.outputConv = value;
  }

  sendDataToBackend() {
    // this.messageService.add(`sendDataToBackend(): ${this.textAreaValue}`);
    console.log(this.textAreaValue);
    const url = 'http://127.0.0.1:5000/';
    
    const data = {
      text : this.textAreaValue,
      'convention' : this.outputConv
    };

    this.httpService.postData(url, data)
      .subscribe(response => {
        // this.messageService.add(`InputComponent: Sending data to output`)
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
        .subscribe(response => this.messageService.add(`InputComponent: Saving data`));
    }
  }

  logout() {
    this.authService.logout()
    this.isLoggedIn = false;
  }
}
