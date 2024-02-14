import { Status } from "./status.enum";

export interface Department {
    id: number;
    departmentName: String;
    startDate: Date;
    status: Status;
}