import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDTO } from './Functions/dto/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:9090/t-manager/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(this.apiUrl);
  }

  getProjectsByManagerId(id: number): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(`${this.apiUrl}/managerid/${id}`);
  }

  createProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(`${this.apiUrl}/create`, project);
  }

  updateProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.http.put<ProjectDTO>(
      `${this.apiUrl}/${project.projectId}`,
      project
    );
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }
}
