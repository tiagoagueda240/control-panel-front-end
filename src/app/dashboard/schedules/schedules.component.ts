import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Calendar, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SchoolClassService } from 'src/app/services/schoolClass.service';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { Event } from 'src/app/models/Event';
import { HttpClient } from '@angular/common/http';
import { TimeSchedule } from '../../models/TimeSchedule';
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import * as XLSX from 'xlsx';
import { InfoScheduleComponent } from './info-schedule copy/info-schedule.component';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public email: string = ""
  public user: any
  public calendarInfo: SchoolClass[] = []
  cursos: Set<String>
  anos: Set<String>
  turmas: Set<String>
  selectedCourse: String = ""
  selectedYear: String = ""
  selectedSchoolClass: String = ""
  eventList: Event[] = []
  timeSchedules: TimeSchedule[] = []
  clear: boolean = false


  constructor(private dialog: MatDialog, private http: HttpClient, private route: ActivatedRoute, private userService: UserService, private router: Router, private schoolClassService: SchoolClassService) {
    this.cursos = new Set<String>()
    this.anos = new Set<String>()
    this.turmas = new Set<String>()



  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],

    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    weekends: true,
    locale: 'pt-br',
    buttonText: {
      today:    'Hoje',
      month:    'Mês',
      week:     'Semana',
      day:      'Dia',
      list:     'Lista',
    },/*
    validRange: {
      start: new Date().toISOString().split("T")[0]
    },*/
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    slotMinTime: '06:00:00',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };


  ngOnInit(): void {
    this.cursos = new Set()
    this.anos = new Set()
    this.turmas = new Set()

    this.colocaHorario()

    this.schoolClassService.getSchoolClasses().then(response => {
      this.calendarInfo = response

      this.timeSchedules.forEach((info) => {
        this.cursos.add(info.schoolClass.course.name)
      })
  })





    this.route.queryParams.subscribe((params: any) => {
      this.email = params.email;
    })
    this.user = this.userService.getUser();
  }

  cleanFilters() {
    this.selectedCourse = ""
    this.selectedYear = ""
    this.selectedSchoolClass = ""
    this.clear = false
  }

  colocaHorario(){
    this.timeSchedules = [];
    this.http.get<TimeSchedule[]>('http://localhost:3000/time-schedule')
    .subscribe((data: TimeSchedule[]) => {
      this.timeSchedules = data;
      const events = data.map(evento => ({
            groupId: evento.id.toString(),
            title: evento.curricularUnit.name,
            startRecur: evento.startRecur + "T" + evento.startTime,
            endRecur: evento.endRecur + "T" + evento.endTime,
            daysOfWeek: evento.daysOfWeek, // eventos nos finais de semana
            startTime: evento.startTime,
            endTime: evento.endTime,
            overlap: false, // impede eventos sobrepostos
            color: evento.curricularUnit.color, // cor do evento
            textColor: '#fff', // cor do texto
            organizer: evento.teacher,
            location: evento.classroom,
      }));
      this.calendarOptions.events = events;
    });
  }


  currentEvents: EventApi[] = []

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    if(this.selectedSchoolClass != ""){
      const dialogRef = this.dialog.open(CreateScheduleComponent, {
        width: '700px',
        data: { start: selectInfo.startStr, end: selectInfo.endStr, day: selectInfo.start, schoolClass: this.selectedSchoolClass }
      });   // const title = prompt('Please enter a new title for your event');

      dialogRef.afterClosed().subscribe(result => {
        // ação a ser executada após o dialog ser fechado
        if(result != "cancelou"){
          //this.colocaHorario()

        }
      });

    }else{
      alert("Selecione uma turma")
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
    }


  }


  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.groupId)
    console.log(clickInfo)

      const dialogRef = this.dialog.open(InfoScheduleComponent, {
        width: '700px',
        data: { id: clickInfo.event.groupId }
      });   // const title = prompt('Please enter a new title for your event');

      dialogRef.afterClosed().subscribe(result => {
        // ação a ser executada após o dialog ser fechado
        if(result == "editar"){
          const dialogRef = this.dialog.open(CreateScheduleComponent, {
            width: '700px',
            data: {timeScheduleId: clickInfo.event.groupId }
          });

        }
      });

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  courseSelected() {
    this.anos.clear()
    this.turmas.clear()
    this.clear = true
    this.timeSchedules.forEach((info) => {
      if(this.selectedCourse === info.schoolClass.course.name){
        this.anos.add(info.schoolClass.year.toString())
      }
    })
  }

  yearSelected() {
    this.turmas.clear()
    this.timeSchedules.forEach((info) => {
      if(this.selectedYear=== info.schoolClass.year.toString() && this.selectedCourse ===  info.schoolClass.course.name){
        this.turmas.add(info.schoolClass.name)
      }
    })
  }


  searchTimeSchedules() {
    const eventosFormatados = this.timeSchedules
      .map(evento => {
        if (
          (this.selectedYear == null  || this.selectedYear === evento.schoolClass.year.toString()) &&
          this.selectedCourse === evento.schoolClass.course.name &&
          (this.selectedSchoolClass == null || this.selectedSchoolClass === evento.schoolClass.name)
        ) {
          return {
            groupId: evento.id.toString(),
            title: evento.curricularUnit.name,
            startRecur: evento.startRecur + "T" + evento.startTime,
            endRecur: evento.endRecur + "T" + evento.endTime,
            daysOfWeek: evento.daysOfWeek, // eventos nos finais de semana
            startTime: evento.startTime,
            endTime: evento.endTime,
            overlap: false, // impede eventos sobrepostos
            color: evento.curricularUnit.color, // cor do evento
            textColor: '#fff', // cor do texto
            organizer: evento.teacher,
            location: evento.classroom
          };
        }
        return undefined;
      })
      .filter(evento => evento !== undefined) // remove valores indefinidos
      .map(evento => evento!); // converte cada objeto em um EventInput

    // atualiza a propriedade events do calendário
    this.calendarOptions.events = eventosFormatados;
  }

  calculateHours(startTime : string, endTime : string){
    const start = new Date(`1970-01-01T${startTime}Z`).getTime();
    const end = new Date(`1970-01-01T${endTime}Z`).getTime();
    const diff = end - start;
    const diffHoras = Math.floor(diff / 3600000); // converte de milissegundos para horas inteiras
    const diffMinutos = Math.floor((diff % 3600000) / 60000); // calcula os minutos restantes
    return diffHoras + ":" + diffMinutos;
  }

  exportXLSX() {
    const worksheet = XLSX.utils.json_to_sheet([
        {}, // linha vazia
        ...this.timeSchedules.map(info => ({
            "Sigla da U.C": info.curricularUnit.sigla,
            "Unidade curricular": info.curricularUnit.name,
            " ": info.schoolClass.name,
            "Docente": info.teacher.name,
            "  ": info.teacher.number,
            "Horas Semanais": this.calculateHours(info.startTime, info.endTime),
            "Data início": info.startRecur,
            "Data fim": info.endRecur,
        })),
    ]);

    worksheet["A2"] = { t: "s", v: "1D1" };
    worksheet["!merges"] = [
        { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
        { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }
    ];

    const b1 = worksheet["B1"];
    b1.alignment = { horizontal: "center" };
    b1.font = { sz: 14, bold: true };

    const d1 = worksheet["D1"];
    d1.alignment = { horizontal: "center" };
    d1.font = { sz: 14, bold: true };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const buffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Horários - 2º Sem 2022_23.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
}



}
