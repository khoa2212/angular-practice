import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment, AssignmentList } from 'app/model';
import { AssignmentClient, DepartmentClient } from 'app/client';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private assignmentClient: AssignmentClient) {}

  findAssignment$(
    pageNumber: number,
    pageSize: number,
    employeeId: number,
    projectId: number
  ): Observable<AssignmentList> {
    const assignment = this.assignmentClient.findAssignments$(
      pageNumber,
      pageSize,
      employeeId,
      projectId
    );

    return assignment;
  }
}
