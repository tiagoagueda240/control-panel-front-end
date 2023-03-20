import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CurricularUnitService } from 'src/app/services/curricularUnits.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  dataLength: any;

  constructor(private curricularUnitService: CurricularUnitService) {
  }

  public searchTerm$ = new Subject<string>();

addRecord() {
throw new Error('Method not implemented.');
}
getAllSelected() {
throw new Error('Method not implemented.');
}
getAllRecords() {
throw new Error('Method not implemented.');
}

  public displayedColumns: string[] = [];

public dataSource = new MatTableDataSource;

public curricularUnits: any[] = []

@Input() type: string = ""

ngOnInit(): void {

  if(this.type == "alunos"){
    this.displayedColumns = [
      'select',
      'id',
      'nome',
      'email',
      'options'
  ];
  }else if(this.type == "docentes"){

  this.displayedColumns = [
    'select',
    'id',
    'nome',
    'email',
    'vinculo',
    'maxHours',
    'minHours',
    'options'
];
  }else if(this.type == "ucs"){

    this.displayedColumns = [
      'select',
      'id',
      'nome',
      'ects',
      'curricularYear',
      'semestre',
      'ciclo',
      'horasPraticas',
      'horasTeoricas',
      'options'
  ];

  this.curricularUnitService.getCurricularUnit().then(response => {
    console.log(response)
    this.dataLength = response.length;
    this.dataSource.data = response;
})


  }else if(this.type == "cursos"){
    this.displayedColumns = [
      'select',
      'id',
      'acronym',
      'studyCycle',
      'options'
  ];
  }
  console.log(this.type)
  console.log(this.displayedColumns)

}




}
