import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  data?: any[];
  constructor(private http : HttpClient) {}

  ngOnInit() {
    this.http.get('/api/get_data')
      .subscribe((response : any) => {
        this.data = response.items;
      });
  }
}
