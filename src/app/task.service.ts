import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDTO } from './dto/task.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:9090/t-manager/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl);
  }
}
