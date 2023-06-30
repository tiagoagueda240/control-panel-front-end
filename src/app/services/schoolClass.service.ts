import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SCHOOLCLASS } from 'src/servicesConstants';



@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getSchoolClasses(): Promise<any> {
    return this.httpClient.get(SCHOOLCLASS)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}


}
