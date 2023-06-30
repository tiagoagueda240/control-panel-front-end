import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { COURSE } from 'src/servicesConstants';



@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getCourses(): Promise<any> {
    return this.httpClient.get(COURSE)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}


getCourseById(id: string): Observable<any> {
  return this.httpClient.get<any>(`${COURSE}/${id}`);
}

deleteCourse(id: string): Observable<any> {
  return this.httpClient.delete(`${COURSE}/${id}`);
}

addCourse(course: any) {
  return this.httpClient.post<Course>(COURSE, course)

}

editCourse(course: any, id: number) {
  return this.httpClient.patch<Course>(`${COURSE}/${id}`, course)
}


}
