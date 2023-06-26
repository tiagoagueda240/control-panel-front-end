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

    public async getProfessores(): Promise<User[]> {
      const url = 'http://localhost:3000/users';
      const users = await this.httpClient.get<User[]>(url).toPromise();
      if (users) {
        return users.filter((user) => user.functionType === 'professor');
      } else {
        return [];
      }
    }

    public async getAlunos(): Promise<User[]> {
      const url = 'http://localhost:3000/users';
      const users = await this.httpClient.get<User[]>(url).toPromise();
      if (users) {
        return users.filter((user) => user.functionType === 'aluno');
      } else {
        return [];
      }
    }

    deleteUser(id: string): Observable<any> {
      return this.httpClient.delete(`http://localhost:3000/users/${id}`);
    }

    addUser(user: any) {
      const url = 'http://localhost:3000/users';

      return this.httpClient.post<any>(url, user)

    }

    editUser(user: any, id: number) {
      const url = `http://localhost:3000/users/${id}`;

      return this.httpClient.patch<any>(url, user)

    }

}
