import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProjectService } from '../project.service';
import { ProjectDTO } from '../dto/project.dto';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { TaskDTO } from '../dto/task.dto';
import { UserDTO } from '../dto/user.dto';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

type TaskStatus =
  | 'BACKLOG'
  | 'ANALYSIS_WIP'
  | 'DEVELOPMENT_WIP'
  | 'TESTING_WIP'
  | 'PRODUCTION_ACCEPTANCE'
  | 'DEFFECT_RAISED';

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
  isLargeScreen: boolean = true;
  isMediumScreen: boolean = false;
  projectStatuses: {
    [key: number]: {
      status: string;
      statusCode: string;
      percentage: number;
      color: string;
    }[];
  } = {};

  private statusColors: { [key in TaskStatus]: string } = {
    BACKLOG: '#E63946', //red
    ANALYSIS_WIP: '#F18701', //orange
    DEVELOPMENT_WIP: '#FFEB0A', //yellow
    TESTING_WIP: '#3B2AE4', //blue
    PRODUCTION_ACCEPTANCE: '#69F628', //green
    DEFFECT_RAISED: '#4F51B1', //purpl
  };
  activities: TaskDTO[] = [];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadUsers();
    if (isPlatformBrowser(this.platformId)) {
      this.updateScreenSize(window.innerWidth); // Initial check
    }
    this.loadRecentActivities();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.project_Count = this.projects.length;
        this.calculateProjectStatuses();
      },
      (error) => {
        this.handleHttpError(error, 'Projects');
      }
    );
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.task_Count = this.tasks.length;
        this.calculateProjectStatuses();
      },
      (error) => {
        this.handleHttpError(error, 'Tasks');
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
        this.handleHttpError(error, 'Users');
      }
    );
  }

  loadRecentActivities(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.activities = data.sort(
          (a, b) =>
            new Date(b.lastUpdatedOn).getTime() -
            new Date(a.lastUpdatedOn).getTime()
        );
      },
      (error) => {
        this.handleHttpError(error, 'Last Activities');
      }
    );
  }

  navigateTo(tab: string) {
    this.activeTab = tab; // Set the active tab
    this.router.navigate([`/${tab}`]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = (event.target as Window).innerWidth;
      this.updateScreenSize(width);
    }
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

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'red';
      case 'MEDIUM':
        return 'orange';
      case 'LOW':
        return 'green';
      default:
        return 'black';
    }
  }

  calculateProjectStatuses(): void {
    this.projectStatuses = {};

    this.projects.forEach((project) => {
      const projectTasks = this.tasks.filter(
        (task) => task.projectId === project.projectId
      );
      const statusCounts = this.countStatuses(projectTasks);

      const totalTasks = projectTasks.length;
      this.projectStatuses[project.projectId] = (
        Object.keys(statusCounts) as TaskStatus[]
      ).map((status) => {
        const statusCode = this.getStatusCode(status);
        return {
          status: status,
          statusCode: statusCode,
          percentage: totalTasks
            ? (statusCounts[status as TaskStatus]! / totalTasks) * 100
            : 0,
          color: this.statusColors[status as TaskStatus],
        };
      });
    });
  }

  getStatusCode(status: TaskStatus): string {
    switch (status) {
      case 'BACKLOG':
        return 'BL';
      case 'ANALYSIS_WIP':
        return 'AW';
      case 'DEVELOPMENT_WIP':
        return 'DW';
      case 'TESTING_WIP':
        return 'TW';
      case 'PRODUCTION_ACCEPTANCE':
        return 'PA';
      case 'DEFFECT_RAISED':
        return 'DR';
      default:
        return '';
    }
  }

  countStatuses(tasks: TaskDTO[]): { [key in TaskStatus]?: number } {
    return tasks.reduce((acc, task) => {
      acc[task.status as TaskStatus] =
        (acc[task.status as TaskStatus] || 0) + 1;
      return acc;
    }, {} as { [key in TaskStatus]?: number });
  }

  private handleHttpError(error: any, entity: string): void {
    console.error(`Error fetching ${entity}`, error);
    if (error.status === 200 && error.error instanceof SyntaxError) {
      console.error(`Unexpected response format for ${entity}. Expected JSON but received HTML.`);
    }
  }
}