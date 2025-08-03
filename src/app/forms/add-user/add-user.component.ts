import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../../Functions/dto/user.dto';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<UserDTO>();
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: UserDTO = this.userForm.value;
      this.userService.createUser(user).subscribe(() => {
        console.log('Project created:', user.username);
        this.router.navigate(['/user']);
      });
    } else {
      console.log('Form is not valid' + this.userForm.value);
    }
    // if (this.userForm.valid) {
    //   console.log(this.userForm.value);
    //   // this.userService.createUser(this.userForm.value);
    //   this.userAdded.emit(this.userForm.value);
    //   this.userForm.reset();
    // }
  }
}
