import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserByUserName(userName: string) {
    return this.http.get<UserDTO>(`${this.apiUrl}/userName/${userName}`);
  }
  getUsersById() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:9090/t-manager/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/id/${id}`);
  }

  getUsersByRole(role: String): Observable<UserDTO[]> {
    console.log(`user service role :- ${role}`);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/role/${role}`);
  }

  createUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/register`, user);
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/${user.userId}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  getUsersByProjectId(projectId: number): Observable<UserDTO[]> {
    const url = `${this.apiUrl}?projectId=${projectId}`;
    return this.http.get<UserDTO[]>(url);
  }
}
