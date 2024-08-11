import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LastActivityComponent } from '../../Templates/last-activity/last-activity.component';
import { ProgressBarComponent } from '../../Templates/progress-bar/progress-bar.component';
import { TaskListComponent } from '../../Templates/task-list/task-list.component';
import { IntroComponent } from '../../Templates/intro/intro.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LastActivityComponent,
    ProgressBarComponent,
    TaskListComponent,
    IntroComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
