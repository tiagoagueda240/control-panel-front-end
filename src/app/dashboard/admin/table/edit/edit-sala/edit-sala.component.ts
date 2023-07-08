import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/Classroom';
import { Course } from 'src/app/models/course';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'edit-sala-dialog',
  templateUrl: './edit-sala.component.html',
  styleUrls: ['./edit-sala.component.css'],
})
export class EditSalaDialogComponent {
 curso : Classroom


 onSubmit() {
  const salaInfo = this.salaControl.value!!.split(".");

  const formData = this.formBuilder.group({
    block: salaInfo[0] ,
    floor: Number(salaInfo[1]),
    classroomNumber: Number(salaInfo[2]) ,
    ocupationLimit: Number(this.ocupationLimitControl.value),
    haveEquipment: this.haveEquipmentControl.value,

  });

  console.log(this.curso)
  this.classroomService.editClassroom( formData.value, this.curso.id ).subscribe(
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
  this.dialogRef.close(false);
}

  title = "Editar sala de aula"
  salaControl = new FormControl('');
  ocupationLimitControl = new FormControl('');
  haveEquipmentControl = new FormControl(false);



  constructor(
    public dialogRef: MatDialogRef<EditSalaDialogComponent>,
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    (async () => {
      this.curso = data;
      const sala = this.curso.block + "." + this.curso.floor + "." + this.curso.classroomNumber;

      try {
        const response = await this.classroomService.getClassroom(sala);
        this.curso = response;
      } catch (error) {
        console.error('Error getting classroom');
        console.error(error);
      }

      console.log(this.curso);
      this.salaControl.setValue(sala);
      this.ocupationLimitControl.setValue(this.curso.ocupationLimit.toString());
      this.haveEquipmentControl.setValue(this.curso.haveEquipment);
    })();
  }


}
