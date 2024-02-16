import { Department } from "./department.model";
import { Gender } from "./gender.enum";
import { Status } from "./status.enum";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    salary: number
    dateOfBirth: Date;
    gender: Gender;
    status: Status
    department: Department;
    departmentId?: number;
}

export interface EmployeeList {
    employees: Employee[];
    totalCount: number;
    lastPage: number;
}