import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../models/course';



@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getCourses(): Promise<any> {
    const url = 'http://localhost:3000/course';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

deleteCourse(id: string): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/course/${id}`);
}

addCourse(course: any) {
  const url = 'http://localhost:3000/course';

  return this.httpClient.post<Course>(url, course)

}

editCourse(course: any, id: number) {
  const url = `http://localhost:3000/course/${id}`;

  return this.httpClient.patch<Course>(url, course)

}


}
