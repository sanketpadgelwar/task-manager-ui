import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { TaskDTO } from '../../dto/task.dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../project.service'; // Import ProjectService
import { UserService } from '../../user.service'; // Import UserService
import { ProjectDTO } from '../../dto/project.dto'; // Import ProjectDTO
import { UserDTO } from '../../dto/user.dto'; // Import UserDTO
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  task: TaskDTO = {
    taskId: 0,
    taskName: '',
    description: '',
    status: '',
    priority: '',
    deadline: '',
    projectId: 0,
    assignedUserId: 0,
    lastUpdatedOn: new Date(),
  };
  statusOptions: string[] = [
    'BACKLOG',
    'ANALYSIS_WIP',
    'DEVELOPMENT_WIP',
    'TESTING_WIP',
    'PRODUCTION_ACCEPTANCE',
    'DEFECT_RAISED',
  ];
  priorityOptions: string[] = ['LOW', 'MEDIUM', 'HIGH'];
  addTaskForm: FormGroup;
  projects: ProjectDTO[] = [];
  users: UserDTO[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService
  ) {
    this.addTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
      projectId: [null, Validators.required],
      assignedUserId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log(this.projects);
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
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      const task: TaskDTO = this.addTaskForm.value;
      console.log('Form Values:', task);
      this.taskService.createTask(task).subscribe(() => {
        console.log('Task created:', task.taskName);
        this.router.navigate(['/dashboard']);
      });
    } else {
      console.log(this.addTaskForm.value);
      console.log('Form is not valid');
    }
  }
}
