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
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
})
export class CreateScheduleComponent{

  title: string;
  start?: string;
  end?: string;
  timeScheduleId?: string;
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
  timeSchedule: TimeSchedule;
  schoolClassSize: number
  ucsAddedFinal: Set<number>;
  tipologiaAulas: {[key: string]: Set<string>} = {}
  tipologiaUc: Set<string>

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    private formBuilder: FormBuilder,
    private schedulesService: SchedulesService,
    private http: HttpClient,
    private classroomService: ClassroomService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.title = "Adicionar Unidade Curricular";
    ({start: this.start, end: this.end, day: this.day, schoolClass: this.schoolClass, timeScheduleId: this.timeScheduleId} = data);



    this.ucsAdded = new Set()
    this.ucsAddedFinal = new Set()

    this.http.get<SchoolClass[]>('http://localhost:3000/school-class')
    .subscribe((data: SchoolClass[]) => {

      data.forEach((info) => {
        this.schoolClassSize = info.users.length

        if(info.name == this.schoolClass){
          this.schoolClassId = info.id


          info.timeSchedules.forEach((timeSchedule) => {
            if(this.ucsAdded.has(timeSchedule.curricularUnit.id)){
              this.ucsAddedFinal.add(timeSchedule.curricularUnit.id)
            }
            this.tipologiaAulas[timeSchedule.curricularUnit.name] = new Set();
            this.tipologiaAulas[timeSchedule.curricularUnit.name].add( timeSchedule.pratica ? "Teórica" : "Prática")
            this.ucsAdded.add(timeSchedule.curricularUnit.id)

        })
      }
      })

    });

    this.http.get<UC[]>('http://localhost:3000/curricular-units')
    .subscribe((data: UC[]) => {
      data.forEach((info) => {
        if(!this.ucsAddedFinal.has(info.id)){
          this.ucs.push(info)
        }
      })


    });


    this.http.get<Classroom[]>('http://localhost:3000/classroom')
    .subscribe((classroom: Classroom[]) => {
      this.classroomsObjects = classroom
      this.classroomsName = new Set()
      classroom.forEach((info) => {

        if(info.ocupationLimit > this.schoolClassSize)
        this.classroomsName.add(info.block + "." + info.floor + "." + info.classroomNumber);
      })
    });


    if(this.start != undefined
      && this.end != undefined
      ){

      this.startTimeControl.setValue(new Date(this.start).toISOString().substr(11, 5));
      this.endTimeControl.setValue(new Date(this.end).toISOString().substr(11, 5));
      this.title = "Adicionar Unidade Curricular";
    }else{
      this.http.get<any>('http://localhost:3000/time-schedule/' + this.timeScheduleId)
    .subscribe((timeSchedule: any) => {
      this.timeSchedule = timeSchedule
      this.startTimeControl.setValue(this.timeSchedule.startTime);
      this.endTimeControl.setValue(this.timeSchedule.endTime);
      this.typeControl.setValue(this.timeSchedule.pratica ? "Prática" : "Teórica")
      this.ucControl.setValue(this.timeSchedule.curricularUnit.name)
      this.classroomControl.setValue(this.timeSchedule.classroom.block + "." + this.timeSchedule.classroom.floor + "." + this.timeSchedule.classroom.classroomNumber)
      this.ucTeacher()
      this.teacherControl.setValue(this.timeSchedule.teacherId.toString())

      this.startDateControl.setValue(this.timeSchedule.startRecur.slice(0,10));
      this.endDateControl.setValue(this.timeSchedule.endRecur.slice(0,10));


    });
    this.title = "Editar Unidade Curricular";

    }
  }

  onNoClick(): void {
    this.dialogRef.close("cancelou");
  }

  ucTeacher() {
    //this.tipologiaUc.clear()

    if(this.ucControl.value != null){
      this.tipologiaUc = this.tipologiaAulas[this.ucControl.value]
      if(this.tipologiaUc == undefined){
        this.tipologiaUc = new Set();
        this.tipologiaUc.add("Teórica")
        this.tipologiaUc.add("Prática")
      }

    }
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

    var classroomId = 0
    this.classroomService.getClassroom().then(response => {
      classroomId = response.id
    });

    const formData = this.formBuilder.group({
      startTime: this.startTimeControl.value,
      endTime: this.endTimeControl.value,
      startRecur: this.startDateControl.value,
      endRecur:  this.endDateControl.value,
      daysOfWeek: [new Date(Date.parse(this.startDateControl.value)).getDay().toString()],
      curricularUnitId: ucId,
      schoolClassId: this.schoolClassId,
      classroomId: classroomId ,
      teacherId: Number(this.teacherControl.value),
      pratica: this.typeControl.value == "Prática"

    });
    console.log(formData)


    if(this.start != undefined && this.end != undefined){

        this.schedulesService.addTimeSchedule( formData.value ).subscribe(
          response => {
            console.log('POST request successful');
            console.log(response);
            this.dialogRef.close("adicionou");

          },
          error => {
            console.error('Error making POST request');
            console.error(error);
          }
        );

      }else{

        this.schedulesService.editTimeSchedule( formData.value,  Number(this.timeScheduleId) ).subscribe(
          response => {
            console.log('POST request successful');
            console.log(response);
            this.dialogRef.close("editou");

          },
          error => {
            console.error('Error making POST request');
            console.error(error);
          }
        );

      }

  }
}
