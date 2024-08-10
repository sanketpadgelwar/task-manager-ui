import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { DashboardComponent } from './admin-dashboard/dashboard.component';
import { ProjectComponent } from './Entity-Components/project/project.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidepanelComponent,
    DashboardComponent,
    ProjectComponent,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
