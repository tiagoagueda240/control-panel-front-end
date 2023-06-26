import { Component} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CurricularUnitService } from 'src/app/services/curricularUnits.service';

@Component({
  selector: 'create-uc-dialog',
  templateUrl: './create-uc.component.html',
  styleUrls: ['./create-uc.component.css'],
})
export class CreateUCDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateUCDialogComponent>,
    private formBuilder: FormBuilder,
    private curricularUnitService: CurricularUnitService
  ) {

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

  this.curricularUnitService.addUC( formData.value ).subscribe(
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
throw new Error('Method not implemented.');
}

  title = "Adicionar Unidade Curricular"
  nameControl = new FormControl('');
  ectsControl = new FormControl('');
  yearControl = new FormControl('');
  semestreControl = new FormControl('');
  practicalHoursControl = new FormControl('');
  theoreticalHoursControl = new FormControl('');
  cicleControl = new FormControl('');
  siglaControl = new FormControl('');




}
