import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/Classroom';
import { TimeSchedule } from 'src/app/models/TimeSchedule';
import { Teacher, UC } from 'src/app/models/UC';
import { Course } from 'src/app/models/course';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'create-sala-dialog',
  templateUrl: './create-sala.component.html',
  styleUrls: ['./create-sala.component.css'],
})
export class CreateSalaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateSalaDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private classroomService: ClassroomService
  ) {

    }

onSubmit() {
  const formData = this.formBuilder.group({
    block: this.salaControl.value!![0],
    floor: parseInt(this.salaControl.value!![2]),
    classroomNumber: parseInt(this.salaControl.value!![4]),
    ocupationLimit:  parseInt(this.ocupationLimitControl.value!!),
    haveEquipment: this.haveEquipmentControl.value
  });

  this.classroomService.addClassroom( formData.value ).subscribe(
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


}
onNoClick() {
  this.dialogRef.close(false);
}

  title = "Adicionar sala de aula"
  salaControl = new FormControl('');
  ocupationLimitControl = new FormControl('');
  haveEquipmentControl = new FormControl(true);





}
