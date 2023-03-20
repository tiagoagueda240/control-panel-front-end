import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestClassroom } from '../models/RequestClassroom';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  public sendRequest(requestClassroom: RequestClassroom){
    return this.httpClient.post(
      "http://localhost:3000/requests",
      requestClassroom
    );
  }

}
