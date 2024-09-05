import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard-Components/admin-dashboard/dashboard.component';
import { ProjectComponent } from './Entity-Components/project/project.component';
import { ActivityComponent } from './sidepanel-components/activity/activity.component';
import { MessagesComponent } from './sidepanel-components/messages/messages.component';
import { MemberComponent } from './sidepanel-components/member/member.component';
import { CalendarComponent } from './sidepanel-components/calendar/calendar.component';
import { SettingsComponent } from './sidepanel-components/settings/settings.component';
import { AddTaskComponent } from './forms/add-task/add-task.component';
import { CreateProjectComponent } from './forms/create-project/create-project.component';
import { UserComponent } from './Entity-Components/user/user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddUserComponent } from './forms/add-user/add-user.component';
import { TaskComponent } from './Entity-Components/task/task.component';
import { LastActivityComponent } from './Templates/last-activity/last-activity.component';
// import { SignInComponent } from './sign-in/sign-in.component';
import { PmDashboardComponent } from './Dashboard-Components/pm-dashboard/pm-dashboard.component';
import { UserDashboardComponent } from './Dashboard-Components/user-dashboard/user-dashboard.component';
// import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task', component: TaskComponent },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'activity', component: LastActivityComponent },
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
