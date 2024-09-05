import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './sidepanel-components/sidepanel/sidepanel.component';
import { DashboardComponent } from './Dashboard-Components/admin-dashboard/dashboard.component';
import { ProjectComponent } from './Entity-Components/project/project.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { AuthService } from './auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

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
