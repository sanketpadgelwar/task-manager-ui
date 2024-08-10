import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from '../../dto/project.dto';
import { TaskDTO } from '../../dto/task.dto';
import { UserDTO } from '../../dto/user.dto';
import { ProjectService } from '../../project.service';
import { TaskService } from '../../task.service';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from "../../forms/add-task/add-task.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTaskComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  users: UserDTO[] = [];
  projects: ProjectDTO[] = [];
  tasks: TaskDTO[] = [];
  newTask: TaskDTO = {
    taskId: 0,
    taskName: '',
    description: '',
    status: '',
    priority: '',
    lastUpdatedOn: new Date(),
    deadline: '',
    projectId: 0,
    assignedUserId: 0,
  };
  deadlineDate: string | undefined;
  showForm: boolean = false;

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
    this.userService.getUsersByRole('TASK_ASSIGNEE').subscribe((users) => {
      this.users = users;
      console.log('Users list:', users);
    });
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      console.log('Project list:', projects);
    });
  }

  updateTask(task: TaskDTO): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask(): void {
    // Combine date and time inputs into LocalDateTime string
    const deadline = `${this.deadlineDate}`;
    this.newTask.deadline = deadline;

    // Convert selected project and user IDs to numbers
    this.newTask.projectId = +this.newTask.projectId;
    this.newTask.assignedUserId = +this.newTask.assignedUserId;
    console.log('New Task:', this.newTask);

    this.taskService.createTask(this.newTask).subscribe((task) => {
      this.tasks.push(task);
      this.newTask = {
        taskId: 0,
        taskName: '',
        description: '',
        status: '',
        priority: '',
        deadline: '',
        lastUpdatedOn: new Date(),
        projectId: 0,
        assignedUserId: 0,
      };
      this.deadlineDate = '';
      this.showForm = false;
    });
  }

  editTask(task: TaskDTO): void {
    // Implement edit task logic here
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
    });
  }
}
