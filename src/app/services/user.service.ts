import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { RequestUser } from '../models/RequestUser';
import { ResponseLogin } from '../models/ResponseLogin';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User

  constructor(private httpClient: HttpClient) { }


    public infosUserByEmail(email: string): Promise<any>{
      return this.httpClient.get<User>(
        "http://localhost:3000/users/email/" + email
      ).toPromise()
      .then(
        (resposta: any) => resposta
      )
    }


    public getUser(): any {
      try {
        return jwt_decode(localStorage.getItem('access_token')!);
      } catch (Error) {
        
      }
    }

}
