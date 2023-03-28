export interface TimeSchedule {
    id: number;
    startTime: string;
    endTime: string;
    startRecur: string;
    endRecur: string;
    daysOfWeek: string[];
    schoolClassId: number;
    classroomId: number;
    curricularUnitId: number;
    teacherId: number;
    pratica: boolean;
    curricularUnit: {
      name: string;
      sigla: string;
      ects: number;
      horasTeoricas: number;
      horasPraticas: number;
      curricularYear: number;
      semestre: number;
      color: string;
      users: {
        name: string;
        number: string;
        functionType: string;
      }[];
    };
    classroom: {
      block: string;
      floor: number;
      classroomNumber: number;
      ocupationLimit: number;
      haveEquipment: boolean;
    };
    schoolClass: {
      name: string;
      year: number;
      course: {
        id: number;
        studyCycle: number;
        acronym: string;
        name: string;
      };
      users: any[];
    };
    teacher: {
      name: string;
      email: string;
      number: string;
    };
  }

  export interface simpleTimeSchedule{
      startTime: string;
      endTime: string;
      startRecur?: string;
      endRecur?: string;
      daysOfWeek: string[];
      curricularUnitId?: string;
      schoolClassId?: string;
      classroomId?: number;
      teacherId?: number;
      pratica?: boolean;
  }
