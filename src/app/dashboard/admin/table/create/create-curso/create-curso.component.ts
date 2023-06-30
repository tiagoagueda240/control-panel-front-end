import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/Classroom';
import { TimeSchedule } from 'src/app/models/TimeSchedule';
import { Teacher, UC } from 'src/app/models/UC';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'create-curso-dialog',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.css'],
})
export class CreateCursoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateCursoDialogComponent>,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {

    }

onSubmit() {
  const formData = this.formBuilder.group({
    studyCycle:  parseInt(this.cicleControl.value!!, 10),
    acronym: this.acronymControl.value,
    name: this.nameControl.value
  });

  this.courseService.addCourse( formData.value ).subscribe(
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

  title = "Adicionar curso"
  nameControl = new FormControl('');
  acronymControl = new FormControl('');
  cicleControl = new FormControl('');





}
