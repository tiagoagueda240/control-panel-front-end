import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomRequestsComponent } from './dashboard/classroom-requests/classroom-requests.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulesComponent } from './dashboard/schedules/schedules.component';
import { TimetableComponent } from './dashboard/timetable/timetable.component';
import { LoginComponent } from './login/login.component';
import { RequestComponent } from './request/request.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'request', component: RequestComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
      {path: 'ClassroomRequests', component: ClassroomRequestsComponent},
      {path: 'schedules', component: SchedulesComponent},
      {path: 'timetable', component: TimetableComponent},
    ] , canActivate: [AuthGuardService]},
    {path: '**', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
