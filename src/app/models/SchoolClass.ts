import { TimeSchedule } from "./TimeSchedule";
import { UC } from "./UC";

export class SchoolClass{
    public id: number;
    public name: String;
    public year: String;
    public curso: String;
    public timeSchedules: TimeSchedule;
    public curricularUnit: UC;

}
