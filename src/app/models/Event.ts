export class Event{
    title: String
    startTime: String
    endTime: String
    startRecur: String
    endRecur: String
    daysOfWeek: String[]

    constructor(title: String, startTime: String, endTime: String, startRecur: String, endRecur: String, daysOfWeek: String[]){
		this.title = title;
		this.startTime = startTime;
        this.endTime = endTime;
        this.startRecur = startRecur;
        this.endRecur = endRecur;
        this.daysOfWeek = daysOfWeek;
	}
}
