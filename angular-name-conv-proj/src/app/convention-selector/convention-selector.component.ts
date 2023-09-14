import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-convention-selector',
  templateUrl: './convention-selector.component.html',
  styleUrls: ['./convention-selector.component.css']
})

export class ConventionSelectorComponent {
  @Input() value? : string;
  @Output() valueEmitter = new EventEmitter<string>();

  onValueChange() {
    this.valueEmitter.emit(this.value)
  }
}
