import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDTO } from './dto/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:9090/t-manager/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(this.apiUrl);
  }
}
