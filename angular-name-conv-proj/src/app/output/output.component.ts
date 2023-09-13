import { Component, Input } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {

  @Input() receivedData : any
  constructor(private messageService : MessageService) {}
}
