import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  data: any[] = [];
  private url = 'http://127.0.0.1:5000/api/get_data'
  constructor(private favoriteService : FavoriteService) {}

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe( response => this.data = response)
  }
}
