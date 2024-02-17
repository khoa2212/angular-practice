import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectList } from 'app/model';
import { ProjectClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private projectClient: ProjectClient) {}

  findAll$(): Observable<Project[]> {
    const projects = this.projectClient.findAll$();
    return projects;
  }

  findProjects$(
    pageNumber: number,
    pageSize: number,
    departmentId: number,
  ): Observable<ProjectList> {
    const projects = this.projectClient.findProjects$(
      pageNumber,
      pageSize,
      departmentId
    );

    return projects;
  }

  findById$(id: number): Observable<Project> {
    return this.projectClient.findById$(id);
  }
}
