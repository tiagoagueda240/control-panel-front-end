import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CreateScheduleComponent } from '../create-schedule/create-schedule.component';
import { TimeSchedule } from 'src/app/models/TimeSchedule';
import { SchedulesService } from 'src/app/services/schedules.service';
import { ConfirmationDialogComponent } from 'src/app/utilities/confirmation-dialog/Confirmation-Dialog.component';

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
  functionType: boolean


  constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    public dialog: MatDialog,
    private http: HttpClient,
    private schedulesService: SchedulesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {



    ({id: this.id, functionType: this.functionType} = data);


    this.schedulesService.getTimeSchedule(this.id)
    .subscribe((timeSchedule: TimeSchedule) => {
      console.log(timeSchedule)
      this.title = timeSchedule.curricularUnit.name;

      this.classroom = timeSchedule.classroom.block + "." + timeSchedule.classroom.floor + "." + timeSchedule.classroom.classroomNumber
      this.time = timeSchedule.startTime.slice(0,5) + " | " + timeSchedule.endTime.slice(0,5)
      this.days = timeSchedule.startRecur.slice(0,10) + " | " + timeSchedule.endRecur.slice(0,10)
      this.curricularUnitEcts = timeSchedule.curricularUnit.ects.toString()
      this.curricularUnitSemestre = timeSchedule.curricularUnit.semestre.toString()

      this.schoolClassYear = timeSchedule.schoolClass.year.toString() /*+ " | " + timeSchedule.schoolClass.name*/
      this.tipoAula = timeSchedule.pratica ? "Prática" : "Teorica"
      this.subtitle = timeSchedule.schoolClass.name + " | " + this.tipoAula

      this.timeSchedule = timeSchedule
    });


  }

  isSecretariado(): boolean{
    return this.functionType
  }

  onNoClick(){
    this.dialogRef.close("cancelou");
  }
  onDelete(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem a certeza que deseja excluir este horário?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(`http://localhost:3000/time-schedule/${this.id}`)
  .subscribe(
    () => console.log('Registro removido com sucesso'),
    error => console.log('Ocorreu um erro ao remover o registro:', error)
  );
    this.dialogRef.close("eliminado");
      }
    });

  }

  onEdit() {
    this.dialogRef.close("editar");
  }
}
