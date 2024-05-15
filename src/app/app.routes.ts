import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CompassCalibrationOutlined } from '@mui/icons-material';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'profile', component: HomepageComponent },
  { path: '**', redirectTo: ' ' },
];
