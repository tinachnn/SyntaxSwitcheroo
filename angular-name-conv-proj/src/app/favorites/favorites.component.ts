import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites: { input : string; output : string }[] = [];
  isLoggedIn : boolean;

  constructor(private authService : AuthenticationService ,private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit() {
    // gets list of favorites for the current user
    if (this.isLoggedIn) {
      this.favoriteService.getFavorites(this.authService.currentUser.userId)
        .subscribe( response => {
          this.favorites = response;
        })
    }
  }

  // delete item from favorites
  onDelete(index : number) {
    this.favoriteService.deleteFavorite(this.authService.currentUser.userId, index)
      .subscribe( response => this.favorites.splice(index, 1))
  }
}
