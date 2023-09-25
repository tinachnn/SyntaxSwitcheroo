import { Component, ElementRef } from '@angular/core';
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

  convention : string = 'snake-case';
  inputData : string = '';
  outputData : string= '';

  favorite : boolean = false;

  constructor(private router : Router, private conversionService: ConversionService, private authService : AuthenticationService, private favoriteService : FavoriteService, private elementRef: ElementRef) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.username = this.authService.currentUser?.username;
  }

  selectConv(option : string) {
    this.convention = option;
    this.onTextInput();
  }

  // converts text when input changes
  onTextInput() {
    this.favorite = false;

    this.conversionService.convertText(this.inputData, this.convention)
      .subscribe(response => {
        this.outputData = response
    });
  }

  clearInput() {
    this.inputData = '';
    this.onTextInput();
  }

  // add item to favorites
  onFavorite() {
    // redirect to login page if not logged in
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } 
    else {
      this.favoriteService.addFavorite(this.authService.currentUser.userId, this.inputData, this.outputData, this.convention)
        .subscribe(response => this.favorite = true);
    } 
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  autoExpand() {
    const textarea = this.elementRef.nativeElement.querySelector('textarea');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
