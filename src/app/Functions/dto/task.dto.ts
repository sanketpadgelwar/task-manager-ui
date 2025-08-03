export interface TaskDTO {
  taskId: number;
  taskName: string;
  description: string;
  status: string;
  priority: string;
  deadline: Date;
  projectId: number;
  lastUpdatedOn: Date;
  assignedUserId: number;
}
