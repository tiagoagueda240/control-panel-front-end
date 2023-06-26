export interface UC {
  id: number;
  curricularYear: number;
  ects: number;
  name: string;
  semestre: number;
  users: Teacher[];
  ciclo: number;
  horasPraticas: number;
  horasTeoricas: number;

}


export interface Teacher {
  id: number;
  name: string;
  functionType: string;
}
