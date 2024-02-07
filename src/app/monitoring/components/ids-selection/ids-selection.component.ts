import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ids-selection',
  templateUrl: './ids-selection.component.html',
  styleUrl: './ids-selection.component.css'
})
export class IdsSelectionComponent {
    @Output() filterTextChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() { }

    onFilterTextChanged(event: any): void {
      const inputValue: string = event.target.value;
      const ids: string[] = inputValue.split(' ').filter(ids => ids.trim() !== '');
      this.filterTextChanged.emit(ids);
  }
}
