import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Trainer } from '../interfaces/trainer';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {


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
  getTraineesBySubject(subject: string): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.url).pipe(
      map(trainees => trainees.filter(trainee => trainee.subject === subject))
    );
  }

  getTraineesByID(id: number): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.url).pipe(
      map(trainees => trainees.filter(trainee => trainee.id === id))
    )
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



}


