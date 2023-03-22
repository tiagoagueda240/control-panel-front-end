export interface UC {
  id: number;
  curricularYear: number;
  ects: number;
  name: String;
  semestre: number;
  users: Teacher[]
}


export interface Teacher {
  id: number;
  name: string;
  functionType: string;
}
