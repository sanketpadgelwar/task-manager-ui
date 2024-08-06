import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { DashboardComponent } from './admin-dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidepanelComponent,
    DashboardComponent,
    ProjectComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
