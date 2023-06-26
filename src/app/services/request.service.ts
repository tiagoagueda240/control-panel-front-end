import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestClassroom } from '../models/RequestClassroom';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }


  sendRequest(request: any) {
    const url = 'http://localhost:3000/requests';

    return this.httpClient.post(url, request)

  }

  editRequestStatus(status: string, id: number) {
    const url = `http://localhost:3000/requests/status/${id}`;
    const requestBody = {
      status: status,
    };
    return this.httpClient.patch<any>(url, requestBody)
  }

  editRequestClassroom(status: string, id: number, classroom: string) {
    const url = `http://localhost:3000/requests/classroom/${id}`;
    const requestBody = {
      status: status,
      classroom: classroom
    };
    return this.httpClient.patch<any>(url, requestBody)
  }

  getRequests(): Promise<any> {
    const url = 'http://localhost:3000/requests';
    return this.httpClient.get(url)
    .toPromise()
    .then(
      (resposta: any) => resposta
    )
}

deleteRequest(id: number): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/requests/${id}`);
}

}
