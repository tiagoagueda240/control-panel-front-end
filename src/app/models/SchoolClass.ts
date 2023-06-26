export class SchoolClass{
  id: number;
  studyCycle: number;
  name: string;
  year: number;
  courseId: number;
  timeSchedules: {
    pratica: boolean;
    curricularUnit: {
      id: number;
      name: string;
      sigla: string;
      ects: number;
      curricularYear: number;
      semestre: number;
      ciclo: number;
      horasPraticas: number;
      horasTeoricas: number;
      color: string;
    };
    schoolClass: {
      id: number;
      studyCycle: number;
      name: string;
      year: number;
      courseId: number;
    };
    teacher: {
      id: number;
      name: string;
      number: string;
      email: string;
      password: string;
      functionType: string;
      vinculo: string;
      maxHours: number;
      minHours: number;
    };
  }[];
  curricularUnit: {
    id: number;
    name: string;
    sigla: string;
    ects: number;
    curricularYear: number;
    semestre: number;
    ciclo: number;
    horasPraticas: number;
    horasTeoricas: number;
    color: string;
  }[];
  course: {
    id: number;
    studyCycle: number;
    acronym: string;
    name: string;
  };
  users: any[];
}
