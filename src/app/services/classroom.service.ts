import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../models/course';
import { Classroom } from '../models/Classroom';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getClassrooms(): Promise<any> {
    const url = 'http://localhost:3000/classroom';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

public getClassroom(): Promise<any> {
  const url = 'http://localhost:3000/classroom/block';
  return this.httpClient.get(url)
  .toPromise()
  .then(
    (resposta: any) => resposta
  )
}

deleteClassroom(id: string): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/classroom/${id}`);
}

addClassroom(classroom: any) {
  const url = 'http://localhost:3000/classroom';

  return this.httpClient.post<Classroom>(url, classroom)

}

editClassroom(classroom: any, id: number) {
  const url = `http://localhost:3000/classroom/${id}`;

  return this.httpClient.patch<Classroom>(url, classroom)

}


}
