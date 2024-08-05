import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { ProjectDTO } from '../dto/project.dto';
import { TaskDTO } from '../dto/task.dto';
import { UserDTO } from '../dto/user.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: ProjectDTO[] = [];
  selectedProject: ProjectDTO | null = null;
  tasks: TaskDTO[] = [];
  filteredTasks: TaskDTO[] = [];
  users: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];

  selectedPriority: string = '';
  selectedStatus: string = '';
  selectedUserFilter: string = 'userId';
  userFilterValue: string = '';

  taskPriorities: string[] = ['High', 'Medium', 'Low'];
  taskStatuses: string[] = ['Not Started', 'In Progress', 'Completed'];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        console.log('Projects:', data); // Log projects
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  selectProject(project: ProjectDTO): void {
    console.log('Selected Project:', project); // Log selected project
    this.selectedProject = project;
    this.loadProjectTasks(project.projectId);
    this.loadProjectUsers(project.projectId);
  }

  deselectProject(): void {
    this.selectedProject = null;
    this.tasks = [];
    this.users = [];
  }

  loadProjectTasks(projectId: number): void {
    this.taskService.getTasksByProjectId(projectId).subscribe(
      (data) => {
        console.log('Tasks:', data); // Log tasks
        this.tasks = data;
        this.filteredTasks = [...this.tasks];
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  loadProjectUsers(projectId: number): void {
    this.userService.getUsersByProjectId(projectId).subscribe(
      (data) => {
        console.log('Users:', data); // Log users
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        (this.selectedPriority === '' ||
          task.priority === this.selectedPriority) &&
        (this.selectedStatus === '' || task.status === this.selectedStatus)
      );
    });
  }

  filterUsers(): void {
    const filterValue = this.userFilterValue.toLowerCase();
    this.filteredUsers = this.users.filter((user) => {
      if (this.selectedUserFilter === 'userId') {
        return user.userId.toString().toLowerCase().includes(filterValue);
      } else if (this.selectedUserFilter === 'username') {
        return user.username.toLowerCase().includes(filterValue);
      } else if (this.selectedUserFilter === 'role') {
        return user.role.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }

  sortTasks(property: 'priority' | 'status'): void {
    this.filteredTasks.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  sortUsers(property: 'userId' | 'username' | 'role'): void {
    this.filteredUsers.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }
}
