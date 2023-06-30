import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestClassroom } from 'src/app/models/RequestClassroom';
import { RequestService } from 'src/app/services/request.service';
import { ConfirmationDialogComponent } from 'src/app/utilities/confirmation-dialog/Confirmation-Dialog.component';
import { CreateScheduleComponent } from '../schedules/create-schedule/create-schedule.component';
import { AddNotificationsComponent } from './add-notifications/add-notifications.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor( public dialog: MatDialog, private userService: UserService, private _snackBar: MatSnackBar, private requestService: RequestService) { }

  requests: RequestClassroom[] = []
  user: User



    ngOnInit() {
      this.updateNotifications()
    }

    classNameSatus(value: string) : string{
      let result: string;

      switch (value) {
        case "Em Análise":
          result = "analise";
          break;
        case "Recusado":
          result = "recusado";
          break;
        default:
          result = "aprovado";
      }

      return result;
    }

    updateNotifications(){
      this.requestService.getRequests().then(response => {
        this.userService.infosUserByEmail(this.userService.getUser().email).then(user => {
          this.user = user
          this.requests = response;

          if(user.functionType == "secretariado"){
            console.log(user.functionType)
            this.requests = this.requests.filter(request => this.status(request.status));
          }else{

            this.requests = this.requests.filter(request => request.author.email == this.user.email);

          }
        })
        .catch(error => {
          console.error('Erro:', error);
        });

    })
    }

    isSecretariado(email: string): Boolean{
      return ("secretariado" == this.user.functionType) && (email != this.user.email)
    }

    statusRecusado(status: string): Boolean{
      return ("Recusado" == status) || ("secretariado" == this.user.functionType)
    }

    onAccept(request: RequestClassroom){
      const dialogRef = this.dialog.open(AddNotificationsComponent, {
        width: '700px',
        data: {
          request: request
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== 'cancelou') {

          this.updateNotifications()

        }
      });
    }

    haveEquipment(value: Boolean): string{
      if(value){
        return "Sala de computadores"
      }
      return "Sala sem computadores"
    }

    status(value: string): Boolean{

      return "Em Análise" == value
    }

    updateStatus(id: number){

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem a certeza que deseja recusar?',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {

          if(this.user.functionType == "secretariado"){
            this.requestService.editRequestStatus( "Recusado",  id ).subscribe(
              response => {
                console.log('POST request successful');
                console.log(response);
                this._snackBar.open('Recusado com sucesso', 'Fechar');
                this.updateNotifications()


              },
              error => {
                console.error('Error making POST request');
                console.error(error);
              }
            );
          }else{
            this.requestService.deleteRequest(id).subscribe(
              () => {
                console.log('reserva excluída com sucesso!');
                this._snackBar.open('Eliminada com sucesso', 'Fechar');

                this.updateNotifications()

              },
              (error) => {
                console.error('Ocorreu um erro ao excluir a reserva:', error);
                // this.showErrorMessage(error);
              }
            );
          }

        }
      });


    }



}
