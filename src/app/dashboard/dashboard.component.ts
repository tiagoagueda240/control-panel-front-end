import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public email: string;
  public user: User;
  public numero: string;
  public privilegios: boolean;

  constructor(private route: ActivatedRoute, private userService: UserService, private loginService: LoginService) { }


  ngOnInit(): void {

    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");
    if (closeBtn) {
    closeBtn.addEventListener("click", ()=>{
      sidebar!.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
    });
    }

    if (searchBtn) {
    searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
      sidebar!.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });
    }

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
     if(sidebar!.classList.contains("open")){
       closeBtn!.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
     }else {
       closeBtn!.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
     }
    }

    this.route.queryParams.subscribe((params: any) => {

    })
          this.user = this.userService.getUser()
          this.numero = this.user.email.replace('@alunos.ulht.pt', '');

  }

  isSecretariado(): Boolean{
    this.userService.infosUserByEmail(this.userService.getUser().email).then(user => {
      this.user = user
    })
    .catch(error => {
      console.error('Erro:', error);
    });
    return "secretariado" == this.user.functionType
  }

  public logout(){
    this.loginService.logout()
  }

}
