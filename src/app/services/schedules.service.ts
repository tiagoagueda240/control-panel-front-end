import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private formData = new Subject<any>();

  formData$ = this.formData.asObservable();

  sendFormData(data: any) {
    this.formData.next(data);
  }
}
