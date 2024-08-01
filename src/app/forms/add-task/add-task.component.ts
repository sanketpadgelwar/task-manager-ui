import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { TaskDTO } from '../../dto/task.dto';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  task: TaskDTO = {
    taskId: 0,
    taskName: '',
    description: '',
    status: '',
    priority: '',
    deadline: '',
    projectId: 0,
    assignedUserId: 0,
  };
  addTaskForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addTaskForm = this.fb.group({
      taskId: [null, Validators.required],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
      projectId: [null, Validators.required],
      assignedUserId: [null, Validators.required],
    });
  }

  onSubmit() {
    this.taskService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
