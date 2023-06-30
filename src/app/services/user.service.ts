import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { RequestUser } from '../models/RequestUser';
import { ResponseLogin } from '../models/ResponseLogin';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { USER, USER_BY_EMAIL } from 'src/servicesConstants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User

  constructor(private httpClient: HttpClient) { }


    public infosUserByEmail(email: string): Promise<any>{
      return this.httpClient.get<User>(
        USER_BY_EMAIL + email
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

    public async getProfessores(): Promise<User[]> {
      const users = await this.httpClient.get<User[]>(USER).toPromise();
      if (users) {
        return users.filter((user) => user.functionType === 'professor');
      } else {
        return [];
      }
    }

    public async getAlunos(): Promise<User[]> {
      const users = await this.httpClient.get<User[]>(USER).toPromise();
      if (users) {
        return users.filter((user) => user.functionType === 'aluno');
      } else {
        return [];
      }
    }

    deleteUser(id: string): Observable<any> {
      return this.httpClient.delete(`${USER}/${id}`);
    }

    addUser(user: any) {
      return this.httpClient.post<any>(USER, user)
    }

    editUser(user: any, id: number) {
      return this.httpClient.patch<any>(`${USER}/${id}`, user)
    }

}
