export interface ProjectWithEmployee {
    id: number;
    projectName: string;
    area: string;
    numberOfEmployees: number;
    totalHours: number;
    totalSalaries: number;
}

export interface ProjectWithEmployeeList {
    projects: ProjectWithEmployee[];
    totalCount: number;
    lastPage: number;
}
