import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Teacher, UC } from 'src/app/models/UC';
import { Classroom } from 'src/app/models/Classroom';
import { SchoolClass } from 'src/app/models/SchoolClass';

@Component({
  selector: 'popup-schedule',
  templateUrl: './popup-schedule.component.html',
  styleUrls: ['./popup-schedule.component.css'],
})
export class PopupScheduleComponent{

  title: string;
  start: string;
  end: string;
  selectedColor: String
  ucControl = new FormControl('');
  typeControl = new FormControl('');
  classroomControl = new FormControl('');
  teacherControl = new FormControl('');
  startTimeControl = new FormControl();
  endTimeControl = new FormControl();
  startDateControl = new FormControl();
  endDateControl = new FormControl();
  day: Date;
  public ucs: UC[] = [];
  public classroomsObjects: Classroom[] = [];
  public classroomsName: Set<String>
  public teachers: Set<Teacher>
  public ucsAdded: Set<number>
  schoolClass: string
  schoolClassId = 1


  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<PopupScheduleComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.title = "Adicionar Unidade Curricular";
    ({start: this.start, end: this.end, day: this.day, schoolClass: this.schoolClass} = data);

    this.startTimeControl.setValue(new Date(this.start).toISOString().substr(11, 5));
    this.endTimeControl.setValue(new Date(this.end).toISOString().substr(11, 5));

    console.log(this.start);
    console.log(this.end);
    this.ucsAdded = new Set()

    this.http.get<SchoolClass[]>('http://localhost:3000/school-class')
    .subscribe((data: SchoolClass[]) => {

      data.forEach((info) => {
        if(info.name == this.schoolClass){
          this.schoolClassId = info.id

          info.timeSchedules.forEach((timeSchedule) => {
            this.ucsAdded.add(timeSchedule.id)
        })
      }
      })
    });

    this.http.get<UC[]>('http://localhost:3000/curricular-units')
    .subscribe((data: UC[]) => {
      data.forEach((info) => {
        console.log(this.ucsAdded)
        console.log(" - " + this.ucsAdded.has(info.id) + " | " + info.id)
        if(!this.ucsAdded.has(info.id)){
          this.ucs.push(info)
        }
      })
    });


    this.http.get<Classroom[]>('http://localhost:3000/classroom')
    .subscribe((classroom: Classroom[]) => {
      this.classroomsObjects = classroom
      this.classroomsName = new Set()
      classroom.forEach((info) => {
        console.log(info)


        this.classroomsName.add(info.block + "." + info.floor + "." + info.classroomNumber);
      })
      console.log(this.classroomsObjects)
    });


  }

  onNoClick(): void {
    this.dialogRef.close("cancelou");
  }

  ucTeacher() {
    console.log("entrou")
    console.log(this.ucs)
    this.teachers = new Set()
    this.ucs.forEach((info) => {
      if(info.name == this.ucControl.value){
        info.users.forEach((teacher) => {
          this.teachers.add(teacher)
        })
      }
    })
  }

  onSubmit() {
    let ucId = 1

    this.ucs.forEach((info) => {
      if(info.name == this.ucControl.value){
        ucId = info.id
      }
    })


this.http.get<SchoolClass[]>('http://localhost:3000/school-class')
    .subscribe((data: SchoolClass[]) => {

      data.forEach((info) => {
        console.log(info.timeSchedules[0].curricularUnitId)
        if(info.name == this.schoolClass){
          this.schoolClassId = info.id
        }
      })

    });

    fetch('http://localhost:3000/time-schedule', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "startTime": this.startTimeControl.value,
    "endTime": this.endTimeControl.value,
    "startRecur": this.startDateControl.value,
    "endRecur": this.endDateControl.value,
    "daysOfWeek": [this.day.getDay().toString()],
    "curricularUnitId": ucId,
    "schoolClassId": this.schoolClassId,
    "classroomId": 1,
    "teacherId": Number(this.teacherControl.value) ,
    "pratica": this.typeControl.value == "pratica"
  })
}).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});

    // Fechar o Dialog
    this.dialogRef.close();
  }
}
