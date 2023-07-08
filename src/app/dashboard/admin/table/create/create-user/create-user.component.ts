import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { SchoolClassService } from 'src/app/services/schoolClass.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'create-user-dialog',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserDialogComponent {
onSubmit() {
  var formData = null
  if(this.eDocente()){
    formData = this.formBuilder.group({
      name: this.nameControl.value,
      number: this.numberControl.value,
      email: this.emailControl.value,
      password:  "123abc!!!ABC",
      vinculo: this.vinculoControl.value,
      functionType: "professor",
      maxHours: parseFloat(this.horasMaximasControl.value!!),
      minHours: parseFloat(this.horasMinimasControl.value!!)

    });
  }else{
    formData = this.formBuilder.group({
      name: this.nameControl.value,
      number: this.numberControl.value,
      email: this.emailControl.value,
      password:  "123abc!!!ABC",
      functionType: "aluno",
      vinculo: "0",
      maxHours: 0,
      minHours: 0
    });
  }


  this.userService.addUser( formData.value ).subscribe(
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

  title = ""
  nameControl = new FormControl('');
  numberControl = new FormControl('');
  emailControl = new FormControl('');
  typeControl = new FormControl('');
  turmaControl = new FormControl('');
  vinculoControl = new FormControl('');
  horasMaximasControl = new FormControl('');
  horasMinimasControl = new FormControl('');
  turmas : Set<string>




  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private schoolClassService: SchoolClassService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.title = "Adicionar " + data;

    this.schoolClassService.getSchoolClasses().then(response => {
      this.turmas = new Set<string>()

      for (let i = 0; i < response.length; i++) {
        this.turmas.add(response[i].name)
      }
  })

    }

    eDocente(): boolean {
      return this.data == "docente"
    }
}
