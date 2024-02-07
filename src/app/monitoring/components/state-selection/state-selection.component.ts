import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-state-selection',
  templateUrl: './state-selection.component.html',
  styleUrl: './state-selection.component.css'
})
export class StateSelectionComponent {
  @Output() outPutEventFail = new EventEmitter<boolean>();
  @Output() outPutEventPass = new EventEmitter<boolean>();

  isFailedButtonRed: boolean = true;
  isPassedButtonGreen: boolean = true;

  clickPassed(): void{
    this.isPassedButtonGreen = !this.isPassedButtonGreen;
    console.log(this.isPassedButtonGreen);
    this.outPutEventPass.emit(this.isPassedButtonGreen);
    console.log("clicked Passed")
  }

  clickFailed(): void{
    this.isFailedButtonRed = !this.isFailedButtonRed;
    console.log(this.isFailedButtonRed);
    this.outPutEventFail.emit(this.isFailedButtonRed);
    console.log("clicked Failed")
  }
}
