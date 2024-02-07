import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterTextChanged = new EventEmitter<string>(); //Transfer to the parent component (data.component) a text entered for filtering
  @Input() filterText?:string; // Waiting to receive from the parent component the value get from store management


  onFilterTextChanged(event: any): void {
    const filterText: string = event.target.value;
    this.filterTextChanged.emit(filterText);

  }
}
