import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { TimeSchedule } from 'src/app/models/TimeSchedule';

@Component({
  selector: 'info-schedule',
  templateUrl: './info-schedule.component.html',
  styleUrls: ['./info-schedule.component.css'],
})
export class InfoScheduleComponent{

  id: string;
  title: string;
  subtitle: string;

  timeSchedule: TimeSchedule;
  classroom: string;
  curricularUnitEcts: string;
  curricularUnitSemestre: string;
  time: string;
  days: string;
  schoolClassYear: string;
  tipoAula: string;


  constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {



    ({id: this.id} = data);


    this.http.get<TimeSchedule>('http://localhost:3000/time-schedule/' + this.id)
    .subscribe((timeSchedule: TimeSchedule) => {
      this.title = timeSchedule.curricularUnit.name;

      this.classroom = timeSchedule.classroom.block + "." + timeSchedule.classroom.floor + "." + timeSchedule.classroom.classroomNumber
      this.time = timeSchedule.startTime + " | " + timeSchedule.endTime
      this.days = timeSchedule.startRecur + " | " + timeSchedule.endRecur
      this.curricularUnitEcts = timeSchedule.curricularUnit.ects.toString()
      this.curricularUnitSemestre = timeSchedule.curricularUnit.semestre.toString()

      this.schoolClassYear = timeSchedule.schoolClass.year.toString() /*+ " | " + timeSchedule.schoolClass.name*/
      this.tipoAula = timeSchedule.pratica ? "Prática" : "Teorica"
      this.subtitle = timeSchedule.schoolClass.name + " | " + this.tipoAula

      this.timeSchedule = timeSchedule
    });


  }

  onNoClick(){
    this.dialogRef.close("cancelou");
  }

  onDelete(){
    this.http.delete(`http://localhost:3000/time-schedule/${this.id}`)
  .subscribe(
    () => console.log('Registro removido com sucesso'),
    error => console.log('Ocorreu um erro ao remover o registro:', error)
  );
    this.dialogRef.close("eliminado");
  }

  onEdit() {
    this.dialogRef.close("editar");
  }
}
