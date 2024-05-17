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
  managersList: UserDTO[] = [];
  assigneeList: UserDTO[] = [];
  tasks: TaskDTO[] = [];
  projects: ProjectDTO[] = [];
  currentSection: string = 'users'; // Default section
  selectedProject: ProjectDTO | null = null;
  selectedProjectsManager: UserDTO | null = null;
  selectedUser: UserDTO | null = null;
  selectedUsersProject: ProjectDTO[] | null = null;
  role = 'PRJECTMANAGER';
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
    //this.role = 'PROJECT_MANAGER';
    this.userService.getUsersByRole(this.role).subscribe((users) => {
      this.managersList = users;
      console.log('Manager list:', users);
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
  showProjectDetails(project: ProjectDTO): void {
    this.selectedProject = project;
    this.userService
      .getUserById(this.selectedProject.managerId)
      .subscribe((user) => {
        this.selectedProjectsManager = user;
      });
    this.selectedUser = null; // Reset selected user
  }

  showManagerDetails(user: UserDTO): void {
    this.selectedUser = user;
    // selectedUsersProject;
    console.log('Project list :- ' + this.selectedUsersProject);
    this.projectService
      .getProjectsByManagerId(this.selectedUser.userId)
      .subscribe((project) => {
        this.selectedUsersProject = project;
      });
    console.log('User Project list :- ' + this.selectedUsersProject);
    this.selectedProject = null; // Reset selected project
  }
}
