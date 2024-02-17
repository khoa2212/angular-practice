import { Department } from "./department.model";
import { Gender } from "./gender.enum";
import { Status } from "./status.enum";

export interface Project {
    id: number;
    projectName: string;
    area: string;
    status: Status
    department: Department;
    departmentId?: number;
}

export interface ProjectList {
    projects: Project[];
    totalCount: number;
    lastPage: number;
}