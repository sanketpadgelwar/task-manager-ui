import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserDTO[] = [];
  showForm: boolean | undefined;
  newUser: UserDTO = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    role: 'TASK_ASSIGNEE',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
  }

  addUser(): void {
    console.log(this.newUser);
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {
        userId: 0,
        username: '',
        email: '',
        password: '',
        role: 'TASK_ASSIGNEE',
      };
    });
  }

  editUser(user: UserDTO): void {
    // Implement edit user functionality
    // This could involve showing a form pre-filled with the user's data
  }

  updateUser(user: UserDTO): void {
    this.userService.updateUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
