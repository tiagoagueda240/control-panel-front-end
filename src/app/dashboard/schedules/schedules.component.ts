import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Calendar, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SchoolClassService } from 'src/app/services/schoolClass.service';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { Event } from 'src/app/models/Event';
import { TimeSchedule } from '../../models/TimeSchedule';
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import * as XLSX from 'xlsx';
import { InfoScheduleComponent } from './info-schedule/info-schedule.component';
import { SchedulesService } from 'src/app/services/schedules.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/services/course.service';
import { User } from 'src/app/models/user';


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
  functionType: String
  userInfos: User


  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private route: ActivatedRoute, private userService: UserService, private schoolClassService: SchoolClassService, private schedulesService: SchedulesService, private courseService: CourseService) {
    this.cursos = new Set<String>()
    this.anos = new Set<String>()
    this.turmas = new Set<String>()

    this.isSecretariado()

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
    },
    editable:false,
    selectable: true,
    selectMirror: false,
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
    this.schedulesService.getTimeSchedules()
    .subscribe((data: TimeSchedule[]) => {
      this.timeSchedules = data;
      console.log(data)

      var events = data.map(evento => ({
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

      if(this.selectedSchoolClass != null){
        this.searchTimeSchedules()
      }else{
        this.calendarOptions.events = events;
      }
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
    if (!this.selectedSchoolClass) {
      //alert('Selecione uma turma');
      this._snackBar.open('Selecione uma turma', 'Fechar');
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      return;
    }

    const dialogRef = this.dialog.open(CreateScheduleComponent, {
      width: '700px',
      data: {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        day: selectInfo.start,
        schoolClass: this.selectedSchoolClass
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'cancelou') {
        this.colocaHorario();
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const { event } = clickInfo;

    console.log(event.groupId);
    console.log(clickInfo.event.groupId);
    console.log(this.user)
    console.log("this.user.functionType")

    const dialogRef = this.dialog.open(InfoScheduleComponent, {
      width: '700px',
      data: { id: event.groupId,
        functionType: this.secretariado()
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'editar') {
        const dialogRef = this.dialog.open(CreateScheduleComponent, {
          width: '700px',
          data: { timeScheduleId: event.groupId },
        });

      } else if (result === 'eliminado') {

      }
      this.colocaHorario();
      this.searchTimeSchedules();
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  courseSelected() {
    this.anos.clear();
    this.turmas.clear();
    this.clear = true;

    this.timeSchedules.forEach((info) => {
      if (this.selectedCourse === info.schoolClass.course.name) {
        this.anos.add(info.schoolClass.year.toString());
      }
    });
  }

  yearSelected() {
    this.turmas.clear();

    this.timeSchedules.forEach((info) => {
      if (
        this.selectedYear === info.schoolClass.year.toString() &&
        this.selectedCourse === info.schoolClass.course.name
      ) {
        this.turmas.add(info.schoolClass.name);
      }
    });
  }

  searchTimeSchedules() {
    //console.log(this.selectedYear === this.timeSchedules[0].schoolClass.year.toString())
    const eventosFormatados = this.timeSchedules
      .filter(
        (evento) =>
          (!this.selectedYear ||
            this.selectedYear === evento.schoolClass.year.toString()) &&
          this.selectedCourse === evento.schoolClass.course.name &&
          (!this.selectedSchoolClass ||
            this.selectedSchoolClass === evento.schoolClass.name)
      )
      .map((evento) => (
        console.log({
          groupId: evento.id.toString(),
          title: evento.curricularUnit.name,
          startRecur: `${evento.startRecur}T${evento.startTime}`,
          endRecur: `${evento.endRecur}T${evento.endTime}`,
          daysOfWeek: evento.daysOfWeek,
          startTime: evento.startTime,
          endTime: evento.endTime,
          overlap: false,
          color: evento.curricularUnit.color,
          textColor: '#fff',
          organizer: evento.teacher,
          location: evento.classroom,
        }),
        {
        groupId: evento.id.toString(),
        title: evento.curricularUnit.name,
        startRecur: `${evento.startRecur}T${evento.startTime}`,
        endRecur: `${evento.endRecur}T${evento.endTime}`,
        daysOfWeek: evento.daysOfWeek,
        startTime: evento.startTime,
        endTime: evento.endTime,
        overlap: false,
        color: evento.curricularUnit.color,
        textColor: '#fff',
        organizer: evento.teacher,
        location: evento.classroom,
      }));

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
            "Data início": info.startRecur.slice(0,10),
            "Data fim": info.endRecur.slice(0,10),
        })),
    ]);

    worksheet["A2"] = {
      t: "s",
      v: "1D1",
      s: {
        fill: {
          fgColor: {
            rgb: "0000FF" // Código RGB para a cor azul
          }
        }
      }
    };
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

showFilters(): Boolean{
  /*if("aluno" == this.functionType){

      this.selectedYear = String(this.userInfos.schoolClass.year)
      this.selectedCourse = String(this.userInfos.schoolClass.courseId)
      this.selectedSchoolClass = String(this.userInfos.schoolClass.name)


    this.searchTimeSchedules()
  }*/
  return !("aluno" == this.user.functionType)
}

secretariado(): Boolean{
  return "secretariado" == this.functionType
}

naoAluno(){
  return "aluno" != this.functionType

}

isSecretariado(){
  console.log(this.userService.getUser().email)

  this.userService.infosUserByEmail(this.userService.getUser().email).then(user => {
    console.log(user)

    this.functionType = user.functionType
    this.userInfos = user

    console.log(user.schoolClass)
    console.log("ola")

    this.courseService.getCourseById(user.schoolClass[0].courseId)
    .subscribe((data: any) => {
      console.log(data)
      if(data != null){
        this.selectedYear = user.schoolClass[0].year.toString()
        this.selectedCourse = data.name
        this.selectedSchoolClass = user.schoolClass[0].name
        this.searchTimeSchedules()

      }

    });

    if(!this.secretariado()){
      this.calendarOptions = {
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
        },
        editable:false,
        selectable: false,
        selectMirror: false,
        dayMaxEvents: true,
        slotMinTime: '06:00:00',
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
      };
    }else{
      this.calendarOptions = {
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
        },
        editable:false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        slotMinTime: '06:00:00',
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
      };
    }

  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

}


