import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ClassroomRequestsComponent } from './dashboard/classroom-requests/classroom-requests.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchedulesComponent } from './dashboard/schedules/schedules.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
      {path: 'ClassroomRequests', component: ClassroomRequestsComponent},
      {path: 'schedules', component: SchedulesComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'admin', component: AdminComponent},
    ] , canActivate: [AuthGuardService]},
    {path: '**', redirectTo: ''},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
