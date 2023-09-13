import { Component } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  text? : string;
  constructor(private httpService: HttpService) {}
  
  ngOnInit() : void {
    this.httpService.getText()
      .subscribe(data => this.text = data)
  }
}
