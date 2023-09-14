import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-convention-selector',
  templateUrl: './convention-selector.component.html',
  styleUrls: ['./convention-selector.component.css']
})

export class ConventionSelectorComponent {
  @Input() value?: string;
}
