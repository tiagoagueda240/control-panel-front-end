import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UC } from '../models/UC';



@Injectable({
  providedIn: 'root'
})
export class CurricularUnitService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  getCurricularUnit(): Promise<any> {
    const url = 'http://localhost:3000/curricular-units';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

addUC(uc: any) {
  const url = 'http://localhost:3000/curricular-units';

  return this.httpClient.post<UC>(url, uc)

}

editUC(uc: any, id: number) {
  const url = `http://localhost:3000/curricular-units/${id}`;

  return this.httpClient.patch<UC>(url, uc)
}

deleteCurricularUnit(id: string): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/curricular-units/${id}`);
}



}
