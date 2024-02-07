import { Injectable } from '@angular/core';
import { Store } from '../../shared/store/store';
import { Trainer } from '../../interfaces/trainer';
import { Observable } from 'rxjs';

export class DataModelStore{
searchCriteria?:string;
searchResult:Trainer[]=[];
}
const Initial_Data:DataModelStore={
  searchCriteria:"",
  searchResult:[]
}

@Injectable({
  providedIn: 'root'
})
export class DataStore extends Store<DataModelStore>{

  constructor() {
    super('dataStore',Initial_Data)
    console.log('datastor ctor');

  }
  getSearchResult(){
    return this.getValue()?.searchResult;

  }
  updateSearchResult(searchResult: any[]){
    this.updateState((state) =>{
      state.searchResult = searchResult;
    })

  }
  getSearchCriteria():Observable<string|undefined>{
    return this.select<string|undefined>((s)=> s.searchCriteria);

  }

  getSearchCriteriaValue(){
    return this.getValue()?.searchCriteria;

  }
  updateSearchCriteria(searchCriteria: string){
    this.updateState((state) =>{
      state.searchCriteria = searchCriteria;
    })
  }
}
