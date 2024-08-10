import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from '../../forms/add-user/add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AddUserComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserDTO[] = [];
  showForm: boolean | false | undefined;
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
      this.showForm = false;
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
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
