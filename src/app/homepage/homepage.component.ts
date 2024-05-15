import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDTO } from '../dto/project.dto';
import { TaskDTO } from '../dto/task.dto';
import { UserDTO } from '../dto/user.dto';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  users: UserDTO[] = [];
  tasks: TaskDTO[] = [];
  projects: ProjectDTO[] = [];
  currentSection: string = 'users'; // Default section

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadTasks();
    this.loadProjects();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log('Users list:', users);
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log('Tasks list:', tasks);
    });
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      console.log('Project list:', projects);
    });
  }

  showSection(section: string): void {
    this.currentSection = section;
  }
}
