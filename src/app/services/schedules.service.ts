import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimeSchedule } from '../models/TimeSchedule';
import { SCHEDULES } from 'src/servicesConstants';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  constructor(private httpClient: HttpClient) { }

  getTimeSchedules(): Observable<TimeSchedule[]> {
    return this.httpClient.get<TimeSchedule[]>(SCHEDULES);
  }

  getTimeSchedule(id: string): Observable<TimeSchedule> {
    return this.httpClient.get<TimeSchedule>(`${SCHEDULES}/${id}`);
  }

  deleteTimeSchedule(id: string): Observable<any> {
    return this.httpClient.delete(`${SCHEDULES}/${id}`);
  }

  editTimeSchedule(timeSchedule: any, id: number) {
    return this.httpClient.patch<any>(`${SCHEDULES}/${id}`, timeSchedule)
  }

  addTimeSchedule(timeSchedule: any) {
    return this.httpClient.patch<any>(SCHEDULES, timeSchedule)
  }

}
