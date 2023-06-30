import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestClassroom } from '../models/RequestClassroom';
import { REQUEST, REQUEST_CLASSROOM, REQUEST_STATUS } from 'src/servicesConstants';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }


  sendRequest(request: any) {
    return this.httpClient.post(REQUEST, request)
  }

  editRequestStatus(status: string, id: number) {
    const requestBody = {
      status: status,
    };
    return this.httpClient.patch<any>(`${REQUEST_STATUS}/${id}`, requestBody)
  }

  editRequestClassroom(status: string, id: number, classroom: string) {
    const requestBody = {
      status: status,
      classroom: classroom
    };
    return this.httpClient.patch<any>(`${REQUEST_CLASSROOM}/${id}`, requestBody)
  }

  getRequests(): Promise<any> {
    return this.httpClient.get(REQUEST)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

deleteRequest(id: number): Observable<any> {
  return this.httpClient.delete(`${REQUEST}/${id}`);
}

}
