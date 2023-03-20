import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { RequestLogin } from '../models/RequestLogin';
import { ResponseLogin } from '../models/ResponseLogin';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService) { }

  public loginResponse?: ResponseLogin;

  public doLogin(requestLogin: RequestLogin){
    

    return this.httpClient.post<ResponseLogin>("http://localhost:3000/login", requestLogin )
    .pipe(map(user => {
      // store user details jwt token in localStorage
      localStorage.setItem('access_token', user.access_token)
      this.router.navigate(['dashboard']);
      return user;
    }));
  }

  public getKey(): string{
    return String(this.loginResponse?.access_token);
  }


public isAuthenticated():boolean{
  console.log(localStorage.getItem('access_token') != undefined)
  if(localStorage.getItem('access_token') != undefined){
    return localStorage.getItem('access_token') !== undefined

  }
  return false
}

public logout() : void{
localStorage.removeItem('access_token')
this.router.navigate(['/']);
}

}
