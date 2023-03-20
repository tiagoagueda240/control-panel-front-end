import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestClassroom } from '../models/RequestClassroom';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public requestClassroom!: RequestClassroom;
  public haveEquipment: string = "";

  constructor(private requestService: RequestService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.requestClassroom = new RequestClassroom();
    this.requestClassroom.authorEmail = this.userService.getUser().email;
  }

  public sendRequest(){
    console.log(this.haveEquipment === 'True');
    this.requestClassroom.haveEquipment = this.haveEquipment === 'True';
    this.requestService.sendRequest(this.requestClassroom).subscribe(
      data => {
        this.router.navigate(['dashboard/schedules']);
      },
    (error: any) => {
      console.error(error);
    })
  }

}
