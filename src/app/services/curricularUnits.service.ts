import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UC } from '../models/UC';
import { CURRICULAR_UNITS } from 'src/servicesConstants';



@Injectable({
  providedIn: 'root'
})
export class CurricularUnitService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  getCurricularUnit(): Promise<any> {
    return this.httpClient.get(CURRICULAR_UNITS)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

addUC(uc: any) {
  return this.httpClient.post<UC>(CURRICULAR_UNITS, uc)

}

editUC(uc: any, id: number) {
  return this.httpClient.patch<UC>(`${CURRICULAR_UNITS}/${id}`, uc)
}

deleteCurricularUnit(id: string): Observable<any> {
  return this.httpClient.delete(`${CURRICULAR_UNITS}/${id}`);
}



}
