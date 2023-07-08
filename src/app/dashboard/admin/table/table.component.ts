import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { CurricularUnitService } from 'src/app/services/curricularUnits.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/utilities/confirmation-dialog/Confirmation-Dialog.component';
import { CreateUserDialogComponent } from './create/create-user/create-user.component';
import { EditUserDialogComponent } from './edit/edit-user/edit-user.component';
import { CreateCursoDialogComponent } from './create/create-curso/create-curso.component';
import { EditCursoDialogComponent } from './edit/edit-curso/edit-curso.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUCDialogComponent } from './create/create-uc/create-uc.component';
import { EditUCDialogComponent } from './edit/edit-uc/edit-uc.component';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CreateSalaDialogComponent } from './create/create-sala/create-sala.component';
import { EditSalaDialogComponent } from './edit/edit-sala/edit-sala.component';
import { MatPaginator } from '@angular/material/paginator';
import { Classroom } from 'src/app/models/Classroom';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  dataLength: any;
  @ViewChild(MatPaginator) paginator: MatPaginator; // Referência para o MatPaginator
  pageSizeOptions = [5, 10, 25, 100] as const;

  constructor(private _snackBar: MatSnackBar, private curricularUnitService: CurricularUnitService, private courseService: CourseService, private userService: UserService, private classroomService: ClassroomService, public dialog: MatDialog) {
  }

  public searchTerm$ = new Subject<string>();


getAllRecords() {
throw new Error('Method not implemented.');
}
getAllSelected() {
  const selectedRows = this.dataSource.data.filter(row => row.selected);
  console.log(selectedRows);
}

  public displayedColumns: string[] = [];

public dataSource = new MatTableDataSource<any>;

public curricularUnits: any[] = []

@Input() type: string = ""

ngOnInit(): void {
  if (this.type == "alunos") {
    this.displayedColumns = ['nome', 'numero', 'email', 'options'];
    this.userService.getAlunos().then(response => {
      this.dataSource.data = response;
      this.dataLength = response.length;
      this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
    });



  } else if (this.type == "docentes") {
    this.displayedColumns = ['nome', 'numero', 'email', 'vinculo', 'maxHours', 'minHours', 'options'];
    this.userService.getProfessores().then(response => {
      this.dataSource.data = response;
      this.dataLength = response.length;
      this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
    });
  } else if (this.type == "ucs") {
    this.displayedColumns = ['nome', 'ects', 'curricularYear', 'semestre', 'ciclo', 'horasPraticas', 'horasTeoricas', 'options'];
    this.curricularUnitService.getCurricularUnit().then(response => {
      this.dataSource.data = response;
      this.dataLength = response.length;
      this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
    });
  } else if (this.type == "cursos") {
    this.displayedColumns = ['nome', 'acronym', 'studyCycle', 'options'];
    this.courseService.getCourses().then(response => {
      this.dataSource.data = response;
      this.dataLength = response.length;
      this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
    });
  } else if (this.type == "salas") {
    this.displayedColumns = ['sala', 'ocupacionLimit', 'haveEquipment', 'options'];
    this.classroomService.getClassrooms().then(response => {
      const lista = [];
      for (let i = 0; i < response.length; i++) {
        const object = {
          sala: response[i].block + "." + response[i].floor + "." + response[i].classroomNumber,
          ocupacionLimit: response[i].ocupationLimit,
          haveEquipment: response[i].haveEquipment
        };
        lista.push(object);
      }
      this.dataSource.data = lista;
      this.dataLength = lista.length;
      this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
    });
  }
}

onDelete(row: any){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: 'Tem a certeza que deseja excluir?'

  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      if(this.type == "alunos"){

        this.userService.deleteUser(row.id).subscribe(
          () => {
            console.log('Aluno excluído com sucesso!');
            this.userService.getAlunos().then(response => {
              console.log(response);
              this.dataLength = response.length;
              this.dataSource.data = response;
            });
          },
          (error) => {
            console.error('Ocorreu um erro ao excluir o aluno:', error);
            // this.showErrorMessage(error);
          }
        );

      }else if(this.type == "docentes"){

        this.userService.deleteUser(row.id).subscribe(
          () => {
            console.log('Professor excluído com sucesso!');
            this.userService.getProfessores().then(response => {
              console.log(response);
              this.dataLength = response.length;
              this.dataSource.data = response;
            });
          },
          (error) => {
            console.error('Ocorreu um erro ao excluir o professor:', error);
            // this.showErrorMessage(error);
          }
        );

      }else if(this.type == "ucs"){

          this.curricularUnitService.deleteCurricularUnit(row.id).subscribe(
            () => {
              console.log('UC excluída com sucesso!');
              this.curricularUnitService.getCurricularUnit().then(response => {
                this.dataLength = response.length;
                this.dataSource.data = response;
            })
            },
            (error) => {
              console.error('Ocorreu um erro ao excluir a UC:', error);
              // this.showErrorMessage(error);
            }
          );

      }else if (this.type == "cursos") {
        console.log(row.id);

        this.courseService.deleteCourse(row.id).subscribe(
          () => {
            console.log('Curso excluído com sucesso!');
            this.courseService.getCourses().then(response => {
              console.log(response);
              this.dataLength = response.length;
              this.dataSource.data = response;
            });
          },
          (error) => {
            console.error('Ocorreu um erro ao excluir o curso:', error);
            // this.showErrorMessage(error);
          }
        );
      }else if(this.type == "salas"){
        console.log(row)
        console.log("teste")
        this.classroomService.getClassroom(row.sala)
        .then((response: any) => {
          const classroomId = response.id;

          this.classroomService.deleteClassroom(classroomId).subscribe(
            () => {
              console.log('Sala excluída com sucesso!');
              this.classroomService.getClassrooms().then(response => {
                console.log(response);
                this.dataLength = response.length;
                this.dataSource.data = response;
              });

              this.classroomService.getClassrooms().then(response => {
                const lista = [];
                for (let i = 0; i < response.length; i++) {
                  const object = {
                    sala: response[i].block + "." + response[i].floor + "." + response[i].classroomNumber,
                    ocupacionLimit: response[i].ocupationLimit,
                    haveEquipment: response[i].haveEquipment
                  };
                  lista.push(object);
                }
                this.dataSource.data = lista;
                this.dataLength = lista.length;
                this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
              });
            },
            (error) => {
              console.error('Ocorreu um erro ao excluir a sala:', error);
            }
          );
        })
        .catch((error) => {
          console.error('Error getting classroom');
          console.error(error);
        });



      }

      this._snackBar.open('Eliminado com sucesso', 'Fechar');
    }
  });
}



onCreate(){
  if(this.type == "alunos"){
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: 'aluno',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "adicionou") {
        this.userService.getAlunos().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
        })
      }
    });
  }else if(this.type == "docentes"){
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: 'docente',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "adicionou") {
        this.userService.getProfessores().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
        })
      }
    });
  }else if(this.type == "ucs"){

    const dialogRef = this.dialog.open(CreateUCDialogComponent, {
      data: 'Unidade Curricular',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "adicionou") {
        this.curricularUnitService.getCurricularUnit().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
      })
      }
    });

  }else if(this.type == "cursos"){
    const dialogRef = this.dialog.open(CreateCursoDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "adicionou") {
        this.courseService.getCourses().then(response => {
          console.log(response);
          this.dataLength = response.length;
          this.dataSource.data = response;
        });
      }
    });
  }else if(this.type == "salas"){
    const dialogRef = this.dialog.open(CreateSalaDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "adicionou") {
        this.classroomService.getClassrooms().then(response => {
          const lista = [];
          for (let i = 0; i < response.length; i++) {
            const object = {
              sala: response[i].block + "." + response[i].floor + "." + response[i].classroomNumber,
              ocupacionLimit: response[i].ocupationLimit,
              haveEquipment: response[i].haveEquipment
            };
            lista.push(object);
          }
          this.dataSource.data = lista;
          this.dataLength = lista.length;
          this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
        });
      }
    });
  }

}

onEdit(row: any){
  if(this.type == "alunos"){
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data : {
        tipo: "aluno",
        info: row
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "editou") {
        this.userService.getAlunos().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
        })
      }
    });

  }else if(this.type == "docentes"){
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data : {
        tipo: "docente",
        info: row
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "editou") {
        this.userService.getProfessores().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
        })
      }
    });
  }else if(this.type == "ucs"){
    const dialogRef = this.dialog.open(EditUCDialogComponent, {
      data : {
        tipo: "Unidade curricular",
        info: row
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "editou") {
        this.curricularUnitService.getCurricularUnit().then(response => {
          this.dataLength = response.length;
          this.dataSource.data = response;
      })
      }
    });

  }else if(this.type == "cursos"){
    const dialogRef = this.dialog.open(EditCursoDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "editou") {
        this.courseService.getCourses().then(response => {
          console.log(response);
          this.dataLength = response.length;
          this.dataSource.data = response;
        });
      }
    });
  }else if(this.type == "salas"){
    const dialogRef = this.dialog.open(EditSalaDialogComponent, {
      data: {
        block: row.sala[0],
        floor: row.sala[2],
        classroomNumber: row.sala[4],
        ocupationLimit: row.ocupacionLimit,
        haveEquipment: row.haveEquipment

      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "editou") {
        this.classroomService.getClassrooms().then(response => {
          const lista = [];
          for (let i = 0; i < response.length; i++) {
            const object = {
              sala: response[i].block + "." + response[i].floor + "." + response[i].classroomNumber,
              ocupacionLimit: response[i].ocupationLimit,
              haveEquipment: response[i].haveEquipment
            };
            lista.push(object);
          }
          this.dataSource.data = lista;
          this.dataLength = lista.length;
          this.dataSource.paginator = this.paginator; // Atribuição do MatPaginator ao dataSource
        });
      }
    });
  }

}




}
