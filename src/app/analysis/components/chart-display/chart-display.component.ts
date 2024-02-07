import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../analysis.service';
import { Chart, registerables } from 'chart.js';
import { Trainer } from '../../../interfaces/trainer';
Chart.register(...registerables);

interface AverageData {
  year: number;
  average: number;
}

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.css'
})
export class ChartDisplayComponent implements OnInit{
  title = "Analysis Component"
  selectedIds: string[] =[];
  selectedSubjects: string[] =[];
  allTrainees: Trainer[] = [];

  constructor(private traineesService: AnalysisService, private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();

 }

  ngOnInit(): void {
      this.getDataTrainees();

  }

  getDataTrainees() :void {
    this.traineesService.getDataTrainees()
    .subscribe((data) => {
      this.allTrainees = data;
    })
  }

  handleChildIDs(data: string[]){
    this.selectedIds = data;
    let idInput: number = parseInt(this.selectedIds[0]);
    this.renderChart2(this.selectedIds);
    this.renderChart1(idInput);
  }

  handleChildSubjects(data: string[]){
    this.selectedSubjects = data;
    console.log("selectedSubjects: ",this.selectedSubjects);
    this.renderChart3(this.selectedSubjects);
  }



  renderChart1(idInput: number) {
    let years: number[] = [];
    let averageScores: number[] = [];
    this.traineesService.sumAverageGradesPerYear(idInput) // The first id in the ids input
      .subscribe((data: AverageData[]) => {
        data.forEach((item: AverageData) => { // Type annotation for 'item'
          years.push(item.year); // Push the year to the years array
          averageScores.push(item.average); // Push the average score to the averageScores array
        });

        console.log("Years: ", years);
        console.log("Average Scores: ", averageScores);

        const stringsOfYears: string[] = years.map(num => num.toString());

        this.createChart("chartId1", stringsOfYears, averageScores);
      });
  }



  async renderChart2(ids: string[]): Promise<void>{
    const averages: number[] = [];
    await Promise.all(
      ids.map(async (id) => {
        const trainees = await this.traineesService.getTraineesByID(parseInt(id)).toPromise();

        // Check if trainees is not undefined and has a length property
        if (trainees && trainees.length > 0) {
          let totalGrade = 0;
          let count = trainees.length;

          trainees.forEach(trainee => {
            totalGrade += trainee.grade;
          });

          const average = totalGrade / count;
          averages.push(average);
        } else {
          // Handle the case where trainees is undefined or empty
          console.log(`No data found for subject: ${id}`);
          // You can decide how to handle this case, such as setting a default value for average
        }
      })
    );

    this.createChart("chartId2", ids, averages);

  }

async renderChart3(subjects: string[]): Promise<void> {
  const averages: number[] = [];

  await Promise.all(
    subjects.map(async (subject) => {
      const trainees = await this.traineesService.getTraineesBySubject(subject).toPromise();

      // Check if trainees is not undefined and has a length property
      if (trainees && trainees.length > 0) {
        let totalGrade = 0;
        let count = trainees.length;

        trainees.forEach(trainee => {
          totalGrade += trainee.grade;
        });

        const average = totalGrade / count;
        averages.push(average);
      } else {
        // Handle the case where trainees is undefined or empty
        console.log(`No data found for subject: ${subject}`);
        // You can decide how to handle this case, such as setting a default value for average
      }
    })
  );

  // Once all averages are calculated, create the chart
  this.createChart("chartAvgSubjects", subjects, averages);
}



  createChart(id: string, labels: string[], data:number[]): void{
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    console.log("data: ", data);
    console.log("labels: ", labels);

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
