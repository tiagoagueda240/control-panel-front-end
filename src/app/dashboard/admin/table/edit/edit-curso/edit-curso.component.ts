import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'edit-curso-dialog',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css'],
})
export class EditCursoDialogComponent {
 curso : Course
 onSubmit() {
  const formData = this.formBuilder.group({
    studyCycle:  parseInt(this.cicleControl.value!!, 10),
    acronym: this.acronymControl.value,
    name: this.nameControl.value
  });

  this.courseService.editCourse( formData.value, this.curso.id ).subscribe(
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
onNoClick() {
throw new Error('Method not implemented.');
}

  title = "Editar curso"
  nameControl = new FormControl('');
  acronymControl = new FormControl('');
  cicleControl = new FormControl('');



  constructor(
    public dialogRef: MatDialogRef<EditCursoDialogComponent>,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
(this.curso = data);

console.log(this.curso)
this.nameControl.setValue(this.curso.name)
this.acronymControl.setValue(this.curso.acronym)
this.cicleControl.setValue(this.curso.studyCycle.toString())

    }

}
