import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { UserDTO } from './Functions/dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserRole: string | null = null;
  private user: UserDTO = {
    userId: 0,
    password: '',
    username: '',
    email: '',
    role: '',
  };
  private role = '';
  constructor(private router: Router, private userService: UserService) {}

  login(username: string, password: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data) => {
        console.log('Projects:', data); // Log projects
        this.user = data;
      },
      (error) => {
        console.error('Error fetching username', error);
      }
    );

    // Redirect to the appropriate route based on the role
    this.redirectUser();
  }

  getRole(): string | null {
    return this.user.role;
  }

  redirectUser(): void {
    if (this.user.role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.user.role === 'PROJECT_MANAGER') {
      this.router.navigate(['/project-manager-dashboard']);
    } else if (this.user.role === 'TASK_ASSIGNEE') {
      this.router.navigate(['/task-assignee-dashboard']);
    }
  }
}
