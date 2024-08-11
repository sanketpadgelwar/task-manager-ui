import { Component } from '@angular/core';
import { TaskDTO } from '../../Functions/dto/task.dto';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-last-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-activity.component.html',
  styleUrl: './last-activity.component.css',
})
export class LastActivityComponent {
  activities: TaskDTO[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.loadRecentActivities();
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
        console.error('Error fetching Last Activities', error);
      }
    );
  }
}
