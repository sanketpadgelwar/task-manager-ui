import { Component } from '@angular/core';
import { Routes } from '@angular/router';
// import { CompassCalibrationOutlined } from '@mui/icons-material';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectComponent },

  { path: 'nav', component: NavbarComponent },

  { path: '**', redirectTo: ' ' },
];
