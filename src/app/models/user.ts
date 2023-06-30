
export class User{
  id: number;
  name: string;
  number: string;
  email: string;
  functionType: string;
  vinculo: string;
  maxHours: number;
  minHours: number;
  requests: any[];
  schoolClass: {
    id: number;
    studyCycle: number;
    name: string;
    year: number;
    courseId: number;
  };;
}
