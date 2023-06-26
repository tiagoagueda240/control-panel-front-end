import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimeSchedule } from '../models/TimeSchedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  constructor(private httpClient: HttpClient) { }

  getTimeSchedules(): Observable<TimeSchedule[]> {
    return this.httpClient.get<TimeSchedule[]>('http://localhost:3000/time-schedule');
  }

  getTimeSchedule(id: string): Observable<TimeSchedule> {
    return this.httpClient.get<TimeSchedule>(`http://localhost:3000/time-schedule/${id}`);
  }

  deleteTimeSchedule(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/time-schedule/${id}`);
  }

  editTimeSchedule(timeSchedule: any, id: number) {
    const url = `http://localhost:3000/time-schedule/${id}`;

    return this.httpClient.patch<any>(url, timeSchedule)
  }

  addTimeSchedule(timeSchedule: any) {
    const url = 'http://localhost:3000/time-schedule';

    return this.httpClient.patch<any>(url, timeSchedule)

  }

}
