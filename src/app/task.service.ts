import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDTO } from './Functions/dto/task.dto';
import { UserDTO } from './Functions/dto/user.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + 'tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl);
  }

  createTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.post<TaskDTO>(this.apiUrl + '/create', task);
  }

  updateTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.put<TaskDTO>(`${this.apiUrl}/${task.taskId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  getTasksByProjectId(projectId: number): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(
      `${this.apiUrl}/tasks/projectId/${projectId}`
    );
  }

  getUsersByProjectId(projectId: number): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(
      `${this.apiUrl}/users/projectId/${projectId}`
    );
  }
}
