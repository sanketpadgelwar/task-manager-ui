import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { ActivityComponent } from './activity/activity.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberComponent } from './member/member.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { AddTaskComponent } from './forms/add-task/add-task.component';
import { CreateProjectComponent } from './forms/create-project/create-project.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'members', component: MemberComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'create-project', component: CreateProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
