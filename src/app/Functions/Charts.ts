// import { ProjectDTO } from '../dto/project.dto';
// import { TaskDTO } from '../dto/task.dto';
// import { ProjectService } from '../project.service';

// type TaskStatus =
//   | 'BACKLOG'
//   | 'ANALYSIS_WIP'
//   | 'DEVELOPMENT_WIP'
//   | 'TESTING_WIP'
//   | 'PRODUCTION_ACCEPTANCE'
//   | 'DEFFECT_RAISED';
// export class Charts {
//   constructor(private projectService: ProjectService) {}
//   projectStatuses: {
//     [key: number]: {
//       status: string;
//       statusCode: string;
//       percentage: number;
//       color: string;
//     }[];
//   } = {};
//   private statusColors: { [key in TaskStatus]: string } = {
//     BACKLOG: '#E63946', //red
//     ANALYSIS_WIP: '#F18701', //orange
//     DEVELOPMENT_WIP: '#FFEB0A', //yellow
//     TESTING_WIP: '#3B2AE4', //blue
//     PRODUCTION_ACCEPTANCE: '#69F628', //green
//     DEFFECT_RAISED: '#4F51B1', //purpl
//   };
//   projects: ProjectDTO[] = [];
//   tasks: TaskDTO[] = [];

//   calculateProjectStatuses(): void {
//     this.projectStatuses = {};

//     this.projects.forEach((project) => {
//       const projectTasks = this.tasks.filter(
//         (task) => task.projectId === project.projectId
//       );
//       const statusCounts = this.countStatuses(projectTasks);

//       const totalTasks = projectTasks.length;
//       this.projectStatuses[project.projectId] = (
//         Object.keys(statusCounts) as TaskStatus[]
//       ).map((status) => {
//         const statusCode = this.getStatusCode(status);
//         return {
//           status: status,
//           statusCode: statusCode,
//           percentage: totalTasks
//             ? (statusCounts[status as TaskStatus]! / totalTasks) * 100
//             : 0,
//           color: this.statusColors[status as TaskStatus],
//         };
//       });
//     });
//   }

//   getStatusCode(status: TaskStatus): string {
//     switch (status) {
//       case 'BACKLOG':
//         return 'BL';
//       case 'ANALYSIS_WIP':
//         return 'AW';
//       case 'DEVELOPMENT_WIP':
//         return 'DW';
//       case 'TESTING_WIP':
//         return 'TW';
//       case 'PRODUCTION_ACCEPTANCE':
//         return 'PA';
//       case 'DEFFECT_RAISED':
//         return 'DR';
//       default:
//         return '';
//     }
//   }

//   countStatuses(tasks: TaskDTO[]): { [key in TaskStatus]?: number } {
//     return tasks.reduce((acc, task) => {
//       acc[task.status as TaskStatus] =
//         (acc[task.status as TaskStatus] || 0) + 1;
//       return acc;
//     }, {} as { [key in TaskStatus]?: number });
//   }
// }
