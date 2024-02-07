import { Injectable } from '@angular/core';
import { DataStore } from './data.store';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainer } from '../../interfaces/trainer';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url = 'api/trainee';
  constructor(private httpClient: HttpClient){}

  getDataTrainees(): Observable<Trainer[]>{
    return this.httpClient.get<Trainer[]>(this.url)
    .pipe(
      map((trainees: any[]) =>{
        return trainees.map(trainee => ({
          id: trainee.id,
          name: trainee.name,
          date_joined: trainee.date_joined,
          grade: trainee.grade,
          subject: trainee.subject
        }));
      })
    )
  }

  getTraineesByID(id: number): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.url).pipe(
      map(trainees => trainees.filter(trainee => trainee.id === id))
    )
  }


saveTrainer(trainer:Trainer) : Observable<Trainer>{
  return this.httpClient.post<Trainer>(this.url, trainer)
  .pipe(
    tap((newTrainer: Trainer) => console.log(`added trainer w/ id=${newTrainer.id}`)),
    catchError(this.handleError('add trainer', trainer))
  );
}

upDateTrainee(trainer: Trainer): Observable<Trainer> {
  return this.httpClient.put<Trainer>(this.url, trainer)
  .pipe(
    tap((newTrainer: Trainer) => console.log(`update trainer w/ id=${newTrainer.id}`)),
    catchError(this.handleError('update trainer', trainer))
  );
}


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
