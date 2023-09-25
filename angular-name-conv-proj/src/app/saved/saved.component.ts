import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  data: any[] = [];
  isLoggedIn : boolean = false;
  private url = 'http://127.0.0.1:5000/api/get_data'
  constructor(private authService : AuthenticationService ,private favoriteService : FavoriteService) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.favoriteService.getFavorites(this.authService.currentUser.userId)
        .subscribe( response => {
          this.data = response;
        })
    }
  }

  onDelete(index : number) {
    this.data.splice(index, 1)
    this.favoriteService.deleteFavorite(this.authService.currentUser.userId, index)
      .subscribe( response => {
        console.log('Successfully deleted')
      })
  }
}
