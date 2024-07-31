import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CompassCalibrationOutlined } from '@mui/icons-material';

import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes: Routes = [
  { path: 'projects', component: ProjectComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'projects', component: ProjectComponent },
  //   { path: 'activity', component: ActivityComponent },
  //   { path: 'messages', component: MessagesComponent },
  //   { path: 'members', component: MembersComponent },
  //   { path: 'calendar', component: CalendarComponent },
  //   { path: 'settings', component: SettingsComponent },
  //   { path: 'new-update', component: NewUpdateComponent },
  // Wildcard route for a 404 page or redirect

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'users', component: UserComponent },
  // { path: 'projects', component: ProjectComponent },
  // { path: 'tasks', component: TaskComponent },
  // { path: 'home', component: HomepageComponent },
  // { path: 'nav', component: NavbarComponent },
  // { path: 'profile', component: HomepageComponent },
  { path: '**', redirectTo: ' ' },
];
