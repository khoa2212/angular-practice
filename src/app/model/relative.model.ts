import { Employee } from "./employee.model";
import { Gender } from "./gender.enum";

export interface Relative {
    id: number;
    fullName: string;
    gender: Gender;
    phoneNumber: string;
    relationship: string;
    employee: Employee;
}

export interface RelativeList {
    relatives: Relative[];
    totalCount: number;
    lastPage: number;
}