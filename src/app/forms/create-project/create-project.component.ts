import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDTO } from '../../dto/project.dto';
import { ProjectService } from '../../project.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-create-project',
  // standalone: true,
  // imports: [FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  project: ProjectDTO = {
    projectId: 0,
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    managerId: 0,
  };
  createProjectForm: FormGroup;
  managers: UserDTO[] = [];
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
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
    this.projectService.createProject(this.project).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
