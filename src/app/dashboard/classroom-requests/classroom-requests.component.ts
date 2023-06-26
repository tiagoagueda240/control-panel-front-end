import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-classroom-requests',
  templateUrl: './classroom-requests.component.html',
  styleUrls: ['./classroom-requests.component.css']
})
export class ClassroomRequestsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private userService: UserService, private requestService: RequestService) { }


startDateControl  = new FormControl();
endDateControl = new FormControl();
equipamentosControl = new FormControl();
motivoControl = new FormControl();
tipoControl = new FormControl();
startTimeControl = new FormControl();
endTimeControl = new FormControl();
combinedDateTimeStart: Date;
combinedDateTimeEnd: Date;


combineDateTime(): void {
  try {
    const dateInicial = new Date(this.startDateControl.value);
    const dateFinal = new Date(this.endDateControl.value);
    const [hoursInicial, minutesInicial] = this.startTimeControl.value.split(":");
    const [hoursFinal , minutesFinal] = this.endTimeControl.value.split(":");
    console.log("teste")



    dateInicial.setHours(+hoursInicial);
    dateInicial.setMinutes(+minutesInicial);
    dateFinal.setHours(+hoursFinal);
    dateFinal.setMinutes(+minutesFinal);

    this.combinedDateTimeStart = dateInicial;
    this.combinedDateTimeEnd = dateFinal;
  } catch (error) {
    console.error('Error combining date and time:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
}

onSubmit() {
  console.log(Boolean(this.equipamentosControl.value))


  if (
    this.startDateControl.value &&
    this.endDateControl.value&&
    this.tipoControl.value &&
    this.startTimeControl.value &&
    this.endTimeControl.value &&
    this.motivoControl.value
  ) {
    this.combineDateTime()
    const formData = this.formBuilder.group({
      requestStartDate: this.combinedDateTimeStart,
      requestFinishDate: this.combinedDateTimeEnd,
      haveEquipment: Boolean(this.equipamentosControl.value),
      type: this.tipoControl.value,
      description: this.motivoControl.value,
      authorEmail: this.userService.getUser().email
    });
    console.log(Boolean(this.equipamentosControl.value))
    console.log(this.combinedDateTimeStart)
    console.log(this.combinedDateTimeEnd)
    this.requestService.sendRequest( formData.value ).subscribe(
      response => {
        console.log('POST request successful');
        console.log(response);
        this._snackBar.open('Requisição enviada com sucesso', 'Fechar', {
          duration: 3000
        });

      },
      error => {
        console.error('Error making POST request');
        this._snackBar.open('Ocorreu um erro, tente mais tarde.', 'Fechar', {
          duration: 3000
        });
        console.error(error);
      }
    );
  } else {
      this._snackBar.open('Preencha todos os campos', 'Fechar', {
        duration: 3000
      });
  }







}




    ngOnInit() {
    }

}
