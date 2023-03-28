import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulesComponent } from './dashboard/schedules/schedules.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestComponent } from './request/request.component';
import { TimetableComponent } from './dashboard/timetable/timetable.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { ClassroomRequestsComponent } from './dashboard/classroom-requests/classroom-requests.component';
import { routes } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { SchoolClassService } from './services/schoolClass.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { CreateScheduleComponent } from './dashboard/schedules/create-schedule/create-schedule.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminComponent } from './dashboard/admin/admin.component';
import { TableComponent } from './dashboard/admin/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InfoScheduleComponent } from './dashboard/schedules/info-schedule copy/info-schedule.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SchedulesComponent,
    LoginComponent,
    RequestComponent,
    TimetableComponent,
    ClassroomRequestsComponent,
    CreateScheduleComponent,
    InfoScheduleComponent,
    AdminComponent,
    TableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FullCalendarModule,
    MatInputModule,
    MatDatepickerModule,MatNativeDateModule
  ],
  entryComponents: [
    CreateScheduleComponent
  ],
  providers: [UserService, RequestService, SchoolClassService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
