import { Component, EventEmitter, Input, Output, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainerDetails } from '../../../interfaces/trainer_details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() trainee: any = {};
  @Output() traineeUpdated: EventEmitter<TrainerDetails> = new EventEmitter<TrainerDetails>();
  @Output() saveClicked: EventEmitter<any> = new EventEmitter();
  @ViewChild('detailsForm') detailsForm!: NgForm;

  save():void{
    console.log("SAVE Click");
    this.traineeUpdated.emit(this.trainee);
    this.saveClicked.emit();
  }


}
