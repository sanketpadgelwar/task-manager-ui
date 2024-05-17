import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from '../dto/project.dto';
import { UserDTO } from '../dto/user.dto';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: ProjectDTO[] = [];
  managersList: UserDTO[] | null = null;
  role = 'PROJECT_MANAGER';
  newProject: ProjectDTO = {
    projectId: 0,
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    managerId: 0,
  };
  showForm = false;
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    console.log(this.projects);
    // this.loadUsers;
    // console.log(this.managersList);
  }

  // loadUsers(): void {
  //   //this.role = 'PROJECT_MANAGER';
  //   this.userService.getUsersByRole(this.role).subscribe((users) => {
  //     this.managersList = users;
  //     console.log('Manager list:', users);
  //   });
  // }

  loadProjects(): void {
    this.projectService
      .getAllProjects()
      .subscribe((projects) => (this.projects = projects));
  }

  getData() {
    this.showForm = !this.showForm;
    this.userService.getUsersByRole(this.role).subscribe((users) => {
      this.managersList = users;
    });
  }
  addProject(): void {
    console.log(this.newProject);
    this.projectService.createProject(this.newProject).subscribe(() => {
      this.loadProjects();
      this.newProject = {
        projectId: 0,
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        managerId: 0,
      };
    });
  }

  editProject(project: ProjectDTO): void {
    // Implement edit project functionality
  }

  updateProject(project: ProjectDTO): void {
    this.projectService.updateProject(project).subscribe(() => {
      this.loadProjects();
    });
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.loadProjects();
    });
  }
}
