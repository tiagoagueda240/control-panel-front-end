import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CurricularUnitService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  public getCurricularUnit(): Promise<any> {
    const url = 'http://localhost:3000/curricular-units';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}


}
