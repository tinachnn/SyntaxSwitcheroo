import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  userId? : number;
  inputText? : string;
  outputText? : string;
  data: any[] = [];
  display : boolean = false;
  private url = 'http://127.0.0.1:5000/api/get_data'
  constructor(private httpService : HttpService) {}

  ngOnInit() {
    this.httpService.getData(this.url)
      .subscribe((response : any) => {
        console.log(response)
        this.data = response;
      });
  }
}
