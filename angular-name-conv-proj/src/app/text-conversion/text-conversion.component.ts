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
    const url = 'http://127.0.0.1:5000/api/post_data'
    const data = {
      'id': 0,
      'input' : this.textAreaValue,
      'output' : this.receivedData,
    }

    this.httpService.postData(url, data)
      .subscribe(response => this.messageService.add(`InputComponent: Saving data`));
  }
}
