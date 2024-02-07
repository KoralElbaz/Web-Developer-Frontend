import { Component, Output, EventEmitter  } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-subjects-selection',
  templateUrl: './subjects-selection.component.html',
  styleUrl: './subjects-selection.component.css'
})
export class SubjectsSelectionComponent {
  @Output() selectedSubjectsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  onSubjectsChange(event: any): void {
    const inputValue: string = event.target.value;
    const subjects: string[] = inputValue.split(' ').filter(subject => subject.trim() !== '');
    this.selectedSubjectsChange.emit(subjects);
    console.log("subjects: ",subjects);

  }

}
