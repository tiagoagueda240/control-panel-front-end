import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi} from '@fullcalendar/core'; // useful for typechecking

import nbLocale from "@fullcalendar/core/locales/pt";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.getUser().name)
  }


  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    locale: nbLocale,
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    dayMaxEvents: true,
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

}
