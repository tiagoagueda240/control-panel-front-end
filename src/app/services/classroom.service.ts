import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/Classroom';
import { CLASSROOM, CLASSROOM_BLOCK } from 'src/servicesConstants';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient) { }


  public getClassrooms(): Promise<any> {
    return this.httpClient.get(CLASSROOM)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

public getClassroom(nome: string): Promise<any> {
  return this.httpClient.get(CLASSROOM_BLOCK + nome).toPromise();
}


deleteClassroom(id: string): Observable<any> {
  return this.httpClient.delete(`${CLASSROOM}/${id}`);
}

addClassroom(classroom: any) {
  return this.httpClient.post<Classroom>(CLASSROOM, classroom)

}

editClassroom(classroom: any, id: number) {
  return this.httpClient.patch<Classroom>(`${CLASSROOM}/${id}`, classroom)

}


}
