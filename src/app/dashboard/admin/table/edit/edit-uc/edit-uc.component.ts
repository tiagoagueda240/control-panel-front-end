import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UC } from 'src/app/models/UC';

import { CurricularUnitService } from 'src/app/services/curricularUnits.service';

@Component({
  selector: 'edit-uc-dialog',
  templateUrl: './edit-uc.component.html',
  styleUrls: ['./edit-uc.component.css'],
})
export class EditUCDialogComponent {
  uc : UC

  constructor(
    public dialogRef: MatDialogRef<EditUCDialogComponent>,
    private formBuilder: FormBuilder,
    private curricularUnitService: CurricularUnitService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    (this.uc = data.info);
    console.log(this.uc)
    console.log(this.uc.name)
    console.log(this.uc.ects.toString())
    this.nameControl.setValue(this.uc.name)
    this.ectsControl.setValue(this.uc.ects.toString())
    this.yearControl.setValue(this.uc.curricularYear.toString())
    this.semestreControl.setValue(this.uc.semestre.toString())
    this.practicalHoursControl.setValue(this.uc.horasPraticas.toString())
    this.theoreticalHoursControl.setValue(this.uc.horasTeoricas.toString())
    this.cicleControl.setValue(this.uc.ciclo.toString())


    }

    onSubmit() {
      const formData = this.formBuilder.group({
        name: this.nameControl.value,
        sigla: this.siglaControl.value,
        ects: parseInt(this.ectsControl.value!!, 10),
        curricularYear:  parseInt(this.yearControl.value!!, 10),
        semestre: parseInt(this.semestreControl.value!!, 10),
        ciclo: parseInt(this.cicleControl.value!!, 10),
        horasPraticas: parseFloat(this.practicalHoursControl.value!!),
        horasTeoricas: parseFloat(this.theoreticalHoursControl.value!!)

      });

      this.curricularUnitService.editUC( formData.value, this.uc.id ).subscribe(
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

  title = "Editar Unidade Curricular"
  nameControl = new FormControl('');
  ectsControl = new FormControl('');
  yearControl = new FormControl('');
  semestreControl = new FormControl('');
  practicalHoursControl = new FormControl('');
  theoreticalHoursControl = new FormControl('');
  cicleControl = new FormControl('');
  siglaControl = new FormControl('');





}
