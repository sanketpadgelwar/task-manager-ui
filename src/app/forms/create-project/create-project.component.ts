import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDTO } from '../../dto/project.dto';
import { ProjectService } from '../../project.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  project: ProjectDTO = {
    projectId: 0,
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    managerId: 0,
  };
  createProjectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createProjectForm = this.fb.group({
      projectId: [null, Validators.required],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      managerId: [null, Validators.required],
    });
  }

  onSubmit() {
    this.projectService.createProject(this.project).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
