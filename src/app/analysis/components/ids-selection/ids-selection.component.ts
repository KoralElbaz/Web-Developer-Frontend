import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ids-selection',
  templateUrl: './ids-selection.component.html',
  styleUrl: './ids-selection.component.css'
})
export class IdsSelectionComponent {
  @Output() selectedIdsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  onIdsChange(event: any): void {
    const inputValue: string = event.target.value;
    const ids: string[] = inputValue.split(' ').filter(ids => ids.trim() !== '');
    this.selectedIdsChange.emit(ids);
    console.log(ids);

  }
}
