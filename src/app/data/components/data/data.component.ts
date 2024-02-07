import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../interfaces/trainer';
import { DataService } from '../../services/data.service';
import { CellClickedEvent, ColDef, GridOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataStore } from '../../services/data.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit{
  title = "Data Component";
  dataTrainees: Trainer[] = [];
  clickOnRow: boolean = false;
  clickAddRow: boolean = false;
  showDetails: boolean = true;
  visible: boolean = false;
  visibleRemove: boolean = false;
  filterTxt$!:Observable<string|undefined>;
  trainee: any;
  private gridApi!: GridApi<Trainer>;
  public rowSelection: 'single' | 'multiple' = 'single';
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "name" },
    { field: "date_joined" },
    { field: "grade" },
    { field: "subject" }
  ];

  constructor(private traineesService: DataService,private dataStore:DataStore){
      this.gridOptions.pagination = true;
      this.gridOptions.paginationPageSize = 10; //According to the requirements of the assignment, display a maximum of 10 lines
  }

  ngOnInit(): void {
      this.getDataTrainees();
      this.clickOnRow = false;
      this.clickAddRow = false;
      this.filterTxt$=this.dataStore.getSearchCriteria();
      this.dataStore.getSearchCriteria().subscribe(res=>{
        console.log("res: ",res);
      })
  }

  getDataTrainees() :void {
      this.traineesService.getDataTrainees()
      .subscribe((data) => {
        this.dataTrainees = data;
      })
  }

  getTraineesByID(id: number): void {
      this.traineesService.getTraineesByID(id)
      .subscribe(trainees => {
        this.trainee = trainees[0];
        console.log("trainees: ",this.trainee);
      });
  }

  onAddRow(){
      this.clickAddRow = true;
      this.trainee = {};
      console.log("Add Click");
  }

  onRemoveRow(): void {
      console.log("Remove Click");
      // Ensure a row is selected
      if (!this.gridApi || !this.gridApi.getSelectedRows().length) {
          console.log("No row selected");
          return;
      }
      const selectedRowId = this.gridApi.getSelectedRows()[0].id;
      const existingIndex = this.dataTrainees.findIndex(trainee => trainee.id === selectedRowId);

      if (existingIndex !== -1) {
          // Remove the row from the array and update the grid
          this.dataTrainees.splice(existingIndex, 1);
          this.gridApi?.setRowData(this.dataTrainees);
      }
      this.visibleRemove = true;
      this.closeDetails();
  }

  onSaveRow(trainer: Trainer){
    if (!trainer) { return; }
    const existingIndex = this.dataTrainees.findIndex(trainee => trainee.id == trainer.id);
    if(this.clickOnRow)
    {
      if(existingIndex !== -1){
        this.traineesService.upDateTrainee(trainer)
        .subscribe(updatedTrainer => {
          // update the row from the array and update the grid
          this.dataTrainees[existingIndex] = updatedTrainer;
          this.gridApi?.redrawRows();
          this.gridApi?.setRowData(this.dataTrainees);
      });
      }
      else {
        console.error("Trainer not found in the dataTrainees array.");
      }
    }
    else if(this.clickAddRow){
      this.traineesService.saveTrainer(trainer)
      .subscribe(newTrainer => {
        // add the new row from the array and update the grid
          this.dataTrainees.push(newTrainer);
          this.gridApi?.redrawRows();
          this.gridApi?.setRowData(this.dataTrainees);
      });
    }
    this.visible = true;
}

  closeDetails() {
    this.clickOnRow = false;
    this.clickAddRow = false;
  }
  onSaveClicked(updatedTrainee: any): void {
    console.log('Save button clicked!');
    this.closeDetails();
  }

  onTraineeUpdated(updatedTrainee: any): void {
    this.trainee = updatedTrainee;
    this.onSaveRow(updatedTrainee);
  }




// --------- gride -----------
  defaultColDef:ColDef = {
    sortable: true, filter:true
  }

  public gridOptions: GridOptions = {}

  onFilterTextChanged(filterText: string): void  {
    this.dataStore.updateSearchCriteria(filterText)
    // Apply the filter to the ID column only
    this.gridApi.setFilterModel({
      id: {
        filterType: 'text',
        type: 'contains',
        filter: filterText
      }
    });
  }

  onGridReady(params: GridReadyEvent<Trainer>) {
    this.gridApi = params.api;
  }

  onCellClicked(event: CellClickedEvent){
    this.clickOnRow = true;
    this.getTraineesByID(event.data.id);
  }
}
