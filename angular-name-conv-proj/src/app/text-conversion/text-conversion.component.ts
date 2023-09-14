import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-text-conversion',
  templateUrl: './text-conversion.component.html',
  styleUrls: ['./text-conversion.component.css']
})
export class TextConversionComponent {
  inputConv : string = 'snake-case';
  outputConv : string = 'camel-case';
  textAreaValue? : string;
  receivedData? : string;
  constructor(private httpService: HttpService, private messageService : MessageService) {}
  
  onChildValueChange(value : string) {
    this.outputConv = value;
  }

  sendDataToBackend() {
    this.messageService.add(`sendDataToBackend(): ${this.textAreaValue}`);
    const data = {
      text : this.textAreaValue,
      'convention' : this.outputConv
    }
    this.httpService.postData(data)
      .subscribe(response => {
        this.messageService.add(`InputComponent: Sending data to output`)
        this.receivedData = response.text
      });
  }
}
