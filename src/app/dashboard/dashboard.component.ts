import { Component, HostListener, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectDTO } from '../dto/project.dto';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { TaskDTO } from '../dto/task.dto';
import { UserDTO } from '../dto/user.dto';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects: ProjectDTO[] = [];
  tasks: TaskDTO[] = [];
  users: UserDTO[] = [];
  project_Count = 0;
  task_Count = 0;
  user_Count = 0;
  private activeTab: string = 'dashboard';

  // Variables for responsive heading
  isLargeScreen: boolean = true;
  isMediumScreen: boolean = false;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadUsers();
    this.updateScreenSize(window.innerWidth); // Initial check
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.project_Count = this.projects.length;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.task_Count = this.tasks.length;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.user_Count = this.users.length;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  navigateTo(tab: string) {
    this.activeTab = tab; // Set the active tab
    this.router.navigate([`/${tab}`]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.updateScreenSize(width);
  }

  updateScreenSize(width: number): void {
    if (width > 1024) {
      this.isLargeScreen = true;
      this.isMediumScreen = false;
    } else if (width > 768) {
      this.isLargeScreen = false;
      this.isMediumScreen = true;
    } else {
      this.isLargeScreen = false;
      this.isMediumScreen = false;
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return '';
    }
  }
}
