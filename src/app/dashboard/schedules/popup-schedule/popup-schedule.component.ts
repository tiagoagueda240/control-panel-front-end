import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'popup-schedule',
  templateUrl: './popup-schedule.component.html',
  styleUrls: ['./popup-schedule.component.css']
})
export class PopupScheduleComponent{
  title: string;
  start: string;
  end: string;
  selectedColor: String
  ucControl = new FormControl('');
  typeControl = new FormControl('');
  classroomControl = new FormControl('');
  teacherControl = new FormControl('');
  startControl = new FormControl('');
  endControl = new FormControl('');
  

  constructor(
    public dialogRef: MatDialogRef<PopupScheduleComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    
    this.title = "Adicionar Unidade Curricular";
    ({start: this.start, end: this.end} = data);
    console.log(this.start);
    console.log(this.end);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}