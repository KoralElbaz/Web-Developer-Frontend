import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TrainerDetails } from './interfaces/trainer_details';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const trainee = [
      {
        id: 1,
        name: "Koral",
        grade: 100,
        email: "koral@gmail.com",
        date_joined: "3.3.2023",
        address: "Oranit",
        city: "Oranit",
        country: "Israel",
        zip: "1",
        subject: "Data-Structures"
      },
      {
        id: 2,
        name: "Adi",
        grade: 60,
        email: "adi@gmail.com",
        date_joined: "1.1.2023",
        address: "Afula",
        city: "Afula",
        country: "Israel",
        zip: "1",
        subject: "Math"
      },
      {
        id: 2,
        name: "Adi",
        grade: 70,
        email: "adi@gmail.com",
        date_joined: "1.1.2022",
        address: "Afula",
        city: "Afula",
        country: "Israel",
        zip: "1",
        subject: "English"
      },
      {
        id: 3,
        name: "Alin",
        grade: 85,
        email: "Alin@gmail.com",
        date_joined: "1.1.2023",
        address: "Haifa",
        city: "Haifa",
        country: "Israel",
        zip: "1",
        subject: "Algebra"
      }
      ,
      {
        id: 4,
        name: "Eli",
        grade: 44,
        email: "Eli@gmail.com",
        date_joined: "3.3.2023",
        address: "Oranit",
        city: "Oranit",
        country: "Israel",
        zip: "1",
        subject: "Data-Structures"
      },
      {
        id: 5,
        name: "Koral",
        grade: 90,
        email: "Koral@gmail.com",
        date_joined: "1.1.2023",
        address: "Afula",
        city: "Afula",
        country: "Israel",
        zip: "1",
        subject: "Math"
      },
      {
        id: 6,
        name: "Alin",
        grade: 70,
        email: "Alin@gmail.com",
        date_joined: "1.1.2023",
        address: "Haifa",
        city: "Haifa",
        country: "Israel",
        zip: "1",
        subject: "Math"
      },
      {
        id: 1,
        name: "Koral",
        grade: 98,
        email: "koral@gmail.com",
        date_joined: "3.3.2020",
        address: "Oranit",
        city: "Oranit",
        country: "Israel",
        zip: "1",
        subject: "Math"
      }
    ];
    return {trainee};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(trainee: TrainerDetails[]): number {
    return trainee.length > 0 ? Math.max(...trainee.map(trainer => trainer.id)) + 1 : 11;
  }
}
