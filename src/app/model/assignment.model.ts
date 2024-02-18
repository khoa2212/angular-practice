import { Employee } from './employee.model';
import { Project } from './project.model';

export interface Assignment {
  id: number;
  employee: Employee;
  project: Project;
}

export interface AssignmentList {
    assignments: Assignment[]
    totalCount: number;
    lastPage: number;
}
