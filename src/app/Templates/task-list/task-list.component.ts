import { Component } from '@angular/core';
import { TaskDTO } from '../../dto/task.dto';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: TaskDTO[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
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

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching Tasks', error);
      }
    );
  }
}
