import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectDTO } from '../dto/project.dto';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
import { TaskDTO } from '../dto/task.dto';
import { UserDTO } from '../dto/user.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  projects: ProjectDTO[] = [];
  tasks: TaskDTO[] = [];
  users: UserDTO[] = [];
  project_Count = 0;
  task_Count = 0;
  user_Count = 0;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadUsers();
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
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.user_Count = this.users.length;
        console.log(this.user_Count);
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }
}
