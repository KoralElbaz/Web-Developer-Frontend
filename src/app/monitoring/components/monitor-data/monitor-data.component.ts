import { Component, OnInit } from '@angular/core';
import {  ColDef, GridApi} from 'ag-grid-community';
import { MonitoringService } from '../../monitoring.service';
import { MonitorTrainer } from '../../../interfaces/trainer_monitor';



@Component({
  selector: 'app-monitor-data',
  templateUrl: './monitor-data.component.html',
  styleUrl: './monitor-data.component.css'
})
export class MonitorDataComponent implements OnInit {
  title = "Monitor Component"
  selectedIds: string[] =[];
  selectedNames:string[] =[];
  isButtonPressedFail: boolean = false;
  isButtonPressedPass: boolean = false;
  monitorTrainers: any;
  allTrainers: any;
  rowStyle?:any;
  gridApi!: GridApi;
  gridParams!: any;
  rowData: MonitorTrainer[] = [];
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "name" },
    { field: "average" },
    { field: "exams" }
  ];



  ngOnInit(): void {
    this.getDataTrainees();
    this.handleChildFailed(true);
    this.handleChildPassed(true);
  }

  constructor(private traineesService: MonitoringService){}

  handleChildIDs(data: string[]){
    this.selectedIds = data;
  }

  handleChildNames(data: string[]){
      this.selectedNames = data;
      console.log("selectedIds: ",this.selectedNames);
    }

  getDataTrainees() :void {
      this.traineesService.getDataForMonitor()
      .subscribe((data) => {
        this.rowData = data;
      })
      console.log("rowData in func",this.rowData);
    }

    handleChildFailed(data: boolean): void {
      this.isButtonPressedFail = data;
      this.setRowStyle();
    }

    handleChildPassed(data: boolean): void {
      this.isButtonPressedPass = data;
      this.setRowStyle();
    }

    onFilterTextChanged(filterText: string[]): void  {
      console.log("filterText:", filterText);
      // Apply the filter to the ID column only
      this.gridApi.setFilterModel({
        id: {
          filterType: 'text',
          type: 'contains',
          filter: filterText[0]
        }
      });
    }

    onFilterNameChanged(filterText: string[]): void  {
      console.log("filterText:", filterText);
      // Apply the filter to the ID column only
      this.gridApi.setFilterModel({
        name: {
          filterType: 'text',
          type: 'contains',
          filter: filterText[0]
        }
      });
    }


    setRowStyle(): void {
        this.rowStyle = (params: any) => {
          if (params.data && params.data.average < 65 && this.isButtonPressedFail) {
            return { background: 'red' };
          } else if (params.data && params.data.average > 64 && this.isButtonPressedPass) {
            return { background: 'green' };
          } else {
            return null;
          }
        };
        this.gridApi?.redrawRows();
      }

    onGridReady(params: any){
      this.gridApi = params.api;

    }

    defaultColDef:ColDef = {
      sortable: true, filter:true
    }

}
