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
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching Projects', error);
      }
    );
  }

  selectProject(project: ProjectDTO): void {
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
        this.tasks = data;
        this.filteredTasks = [...this.tasks];
      },
      (error) => {
        console.error('Error fetching Projects By Task', error);
      }
    );
  }

  loadProjectUsers(projectId: number): void {
    this.taskService.getUsersByProjectId(projectId).subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Error fetching Users By Project', error);
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
}
