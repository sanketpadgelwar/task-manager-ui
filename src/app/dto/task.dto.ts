export interface TaskDTO {
  taskId: number;
  taskName: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  projectId: number;
  assignedUserId: number;
}
