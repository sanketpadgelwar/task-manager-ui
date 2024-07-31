import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
export class AppComponent {
  title = 'task-manager-ui';
  showProjects: boolean = false; // or false
  showDashboard: boolean = true; // or true

  // Method to toggle between views
  toggleView(view: string) {
    if (view === 'projects') {
      this.showProjects = true;
      this.showDashboard = false;
    } else if (view === 'dashboard') {
      this.showProjects = false;
      this.showDashboard = true;
    }
  }
}
