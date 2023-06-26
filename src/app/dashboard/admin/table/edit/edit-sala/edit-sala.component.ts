import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/Classroom';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'edit-sala-dialog',
  templateUrl: './edit-sala.component.html',
  styleUrls: ['./edit-sala.component.css'],
})
export class EditSalaDialogComponent {
 curso : Classroom
 onSubmit() {
  const formData = this.formBuilder.group({
    studyCycle:  parseInt(this.haveEquipmentControl.value!!, 10),
    acronym: this.ocupationLimitControl.value,
    name: this.salaControl.value
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

  title = "Editar Sala"
  salaControl = new FormControl('');
  ocupationLimitControl = new FormControl('');
  haveEquipmentControl = new FormControl('');



  constructor(
    public dialogRef: MatDialogRef<EditSalaDialogComponent>,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
(this.curso = data);

console.log(this.curso)
this.salaControl.setValue(this.curso.block)
this.ocupationLimitControl.setValue(this.curso.ocupationLimit.toString())
this.haveEquipmentControl.setValue(this.curso.haveEquipment.toString())

    }

}
