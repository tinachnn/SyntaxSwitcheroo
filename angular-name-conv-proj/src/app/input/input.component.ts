import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  textAreaValue? : string;
  data? : string;
  constructor(private httpService: HttpService, private messageService : MessageService) {}
  
  sendDataToBackend() {
    this.messageService.add(`sendDataToBackend(): ${this.textAreaValue}`);
    const data = {
      text : this.textAreaValue
    }
    this.httpService.postData(data)
      .subscribe(response => {
        this.messageService.add(`InputComponent: Sending data to output`)
        this.data = response.text
      });
  }
}
