import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getSchoolClasses(): Promise<any> {
    const url = 'http://localhost:3000/school-class';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}


}
