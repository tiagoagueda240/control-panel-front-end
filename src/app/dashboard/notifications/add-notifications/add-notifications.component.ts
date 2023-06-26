import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Teacher, UC } from 'src/app/models/UC';
import { Classroom } from 'src/app/models/Classroom';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { TimeSchedule } from 'src/app/models/TimeSchedule';
import { SchedulesService } from 'src/app/services/schedules.service';
import { RequestClassroom } from 'src/app/models/RequestClassroom';
import { RequestService } from 'src/app/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-notifications',
  templateUrl: './add-notifications.component.html',
  styleUrls: ['./add-notifications.component.css'],
})
export class AddNotificationsComponent{

  title: string;
  request: RequestClassroom
  classroomControl = new FormControl('');
  public classroomsObjects: Classroom[] = [];
  public classroomsName: Set<String>


  constructor(
    public dialogRef: MatDialogRef<AddNotificationsComponent>,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.title = "Escolher sala de aula";
    ({request: this.request} = data);

    this.http.get<Classroom[]>('http://localhost:3000/classroom')
    .subscribe((classroom: Classroom[]) => {
      this.classroomsObjects = classroom
      this.classroomsName = new Set()
      classroom.forEach((info) => {

        if(info.haveEquipment == this.request.haveEquipment){
          this.classroomsName.add(info.block + "." + info.floor + "." + info.classroomNumber);
        }
      })
    });

  }

  onNoClick(): void {
    this.dialogRef.close("cancelou");
  }

  onSubmit() {
    this.requestService.editRequestClassroom( "Aprovado",  this.request.id, this.classroomControl.value!! ).subscribe(
      response => {
        console.log('POST request successful');
        console.log(response);
        this._snackBar.open('Aprovado com sucesso', 'Fechar');
        this.dialogRef.close("Aprovou");


      },
      error => {
        console.error('Error making POST request');
        console.error(error);
      }
    );

  }
}
