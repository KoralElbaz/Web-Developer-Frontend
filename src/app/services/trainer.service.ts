import { Injectable } from '@angular/core';
import { TrainerDetails } from '../interfaces/trainer_details';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of , forkJoin } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Trainer } from '../interfaces/trainer';


@Injectable({
  providedIn: 'root'
})
export class TraineesService {

  // private url ="assets/trainees.json";
  private url = 'api/trainee';

  constructor(private httpClient: HttpClient){}

  getAllDataTrainees(): Observable<Trainer[]>{
    return this.httpClient.get<Trainer[]>(this.url)
    .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Trainer[]>('getTrainees', []))
    );
  }

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


  getDataForMonitor(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url).pipe(
      map((trainees: any[]) => {
        // Create a map to store the grades of exams for each trainer
        const trainerGradesMap = new Map<number, number[]>();

        // Iterate through the trainees to collect grades for each trainer
        trainees.forEach(trainee => {
          // Check if the trainer ID exists in the map, if not, initialize it with an empty array
          if (!trainerGradesMap.has(trainee.id)) {
            trainerGradesMap.set(trainee.id, []);
          }

          // Add the grade to the array of grades for the trainer
          const grades = trainerGradesMap.get(trainee.id) || [];
          grades.push(trainee.grade);
          trainerGradesMap.set(trainee.id, grades); // Update the value in the map
        });

        // Convert the map to an array of objects with the required structure
        const resultData = Array.from(trainerGradesMap).map(([id, grades]) => ({
          id: id,
          name: trainees.find(trainee => trainee.id === id)?.name || '', // Get the trainer's name
          average: this.calculateAverage(grades), // Calculate the average grade
          exams: grades.length // Get the count of exams
        }));

        return resultData;
      })
    );
  }

  private calculateAverage(grades: number[]): string {
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / grades.length || 0;
    return average.toFixed(2);
  }





  sumAverageGradesByID(id: number): Observable<number> {
    return this.getTraineesByID(id).pipe(
      map(trainees => {
        let sum = 0;
        let numOfExams = trainees.length;
        trainees.forEach(trainee => {
          sum += trainee.grade; // Assuming average is a string representation of a number
        });
        const average = sum / numOfExams;
        return average;
      })
    );
  }

  sumAverageGradesPerYear(id: number): Observable<any> {
    const averageScoresByYear: any = {}; // Object to store average scores by year

    return this.getTraineesByID(id).pipe(
      map(trainees => {
        // Iterate through the trainees' data
        trainees.forEach(trainee => {
          const year = trainee.date_joined.slice(-4); // Extract the year from the date

          if (!averageScoresByYear[year]) {
            // If the year is not yet in the object, initialize it with the first score
            averageScoresByYear[year] = {
              totalScore: trainee.grade,
              count: 1
            };
          } else {
            // If the year exists, update the total score and count
            averageScoresByYear[year].totalScore += trainee.grade;
            averageScoresByYear[year].count++;
          }
        });

        // Calculate the average score for each year
        const result: any[] = [];
        for (const year in averageScoresByYear) {
          if (averageScoresByYear.hasOwnProperty(year)) {
            const average = averageScoresByYear[year].totalScore / averageScoresByYear[year].count;
            result.push({ year, average });
          }
        }

        return result;
      })
    );
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
      tap((newTrainer: Trainer) => console.log(`added trainer w/ id=${newTrainer.id}`)),
      catchError(this.handleError('add trainer', trainer))
    );
  }

  addNewTrainee(trainer: Trainer): Observable<any> {


    return of("add New")
  }

  removeTrainee(trainer: Trainer): Observable<any> {

    return of("remove")
  }

  getTraineesByID(id: number): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.url).pipe(
      map(trainees => trainees.filter(trainee => trainee.id === id))
    )
  }

  getTraineesBySubject(subject: string): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.url).pipe(
      map(trainees => trainees.filter(trainee => trainee.subject === subject))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



//  for anlysis

}
