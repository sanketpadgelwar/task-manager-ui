import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjectService } from '../../project.service';
import { UserService } from '../../user.service';
import { UserDTO } from '../../Functions/dto/user.dto';
import { ProjectDTO } from '../../Functions/dto/project.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  createProjectForm: FormGroup;
  managers: UserDTO[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      managerId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadManagers();
  }

  loadManagers(): void {
    this.userService.getUsersByRole('PROJECT_MANAGER').subscribe(
      (data) => {
        this.managers = data;
        console.log(this.managers);
      },
      (error) => {
        console.error('Error fetching managers', error);
      }
    );
  }

  onSubmit() {
    if (this.createProjectForm.valid) {
      const project: ProjectDTO = this.createProjectForm.value;
      this.projectService.createProject(project).subscribe(() => {
        console.log('Project created:', project.projectName);
        this.router.navigate(['/dashboard']);
      });
    } else {
      console.log('Form is not valid' + this.createProjectForm.value);
    }
  }
}
