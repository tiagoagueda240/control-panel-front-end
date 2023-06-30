import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-user-dialog',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserDialogComponent {

  onSubmit() {
    var formData = null
    if(this.eDocente()){
      formData = this.formBuilder.group({
        name: this.nameControl.value,
        number: this.numberControl.value,
        email: this.emailControl.value,
        password:  "",
        vinculo: this.vinculoControl.value,
        functionType: "professor",
        maxHours: parseFloat(this.maxHoursControl.value!!),
        minHours: parseFloat(this.minHoursControl.value!!)

      });
    }else{
      formData = this.formBuilder.group({
        name: this.nameControl.value,
        number: this.numberControl.value,
        email: this.emailControl.value,
        password:  "",
        functionType: "aluno"
      });
    }


    this.userService.editUser( formData.value, this.data.info.id ).subscribe(
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

  title = ""
  nameControl = new FormControl('');
  numberControl = new FormControl('');
  emailControl = new FormControl('');
  schoolClassControl = new FormControl('');
  vinculoControl = new FormControl('');
  maxHoursControl = new FormControl('');
  minHoursControl = new FormControl('');


  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = "Editar " + data.tipo;

    console.log(this.data.info)
    this.nameControl.setValue(this.data.info.name)
    this.numberControl.setValue(this.data.info.number)
    this.emailControl.setValue(this.data.info.email)

    if(this.eDocente()){
      this.vinculoControl.setValue(this.data.info.vinculo)
      this.maxHoursControl.setValue(this.data.info.maxHours)
      this.minHoursControl.setValue(this.data.info.minHours)

    }


    }

    eDocente(): boolean {
      return this.data.tipo == "docente"
    }
}
