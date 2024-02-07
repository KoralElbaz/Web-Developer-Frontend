import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-names-selection',
  templateUrl: './names-selection.component.html',
  styleUrl: './names-selection.component.css'
})
export class NamesSelectionComponent {
  @Output() selectedNamesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  onFilterNameChanged(event: any): void {
    const inputValue: string = event.target.value;
    const names: string[] = inputValue.split(' ').filter(names => names.trim() !== '');
    this.selectedNamesChange.emit(names);
    console.log(names);
  }
}
