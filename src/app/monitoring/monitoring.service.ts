import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  private url = 'api/trainee';

  constructor(private httpClient: HttpClient){}

  getDataForMonitor(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url).pipe(
      map((trainees: any[]) => {
        // Create a map to store the grades of exams for each trainer
        const trainerGradesMap = new Map<number, number[]>();
        trainees.forEach(trainee => {
          if (!trainerGradesMap.has(trainee.id)) {
            trainerGradesMap.set(trainee.id, []);
          }
          // Add the grade to the array of grades for the trainer
          const grades = trainerGradesMap.get(trainee.id) || [];
          grades.push(trainee.grade);
          trainerGradesMap.set(trainee.id, grades);
        });
        // Convert the map to an array of objects with the required structure
        const resultData = Array.from(trainerGradesMap).map(([id, grades]) => ({
          id: id,
          name: trainees.find(trainee => trainee.id === id)?.name || '',
          average: this.calculateAverage(grades),
          exams: grades.length
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

}
