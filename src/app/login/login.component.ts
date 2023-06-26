import { Component, OnInit } from '@angular/core';
import { RequestLogin } from '../models/RequestLogin';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public requestLogin!: RequestLogin;

  constructor(private loginService: LoginService,private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }



  public goToRecuperar(){
    let container = document.querySelector(".container");
    container?.classList.add("sign-up-mode");
  }

  public goToLogin(){
    let container = document.querySelector(".container");
    container?.classList.remove("sign-up-mode");

  }

  public VerifyLogin(){

  }

  public doLogin(){
    this.loginService.doLogin(this.requestLogin).subscribe(
      data => {
    },
    (error) => {
      console.error(error);
      if(!this.authGuardService.canActivate()){
        let error_message = document.getElementById("error-message-login");
        error_message!.style.display = "block";
      }
    })
  }

}
