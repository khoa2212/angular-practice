import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentList } from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { ASSIGNMENT } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class AssignmentClient {
  constructor(private httpClient: HttpClient) {}

  findAssignments$(
    pageNumber: number,
    pageSize: number,
    employeeId: number,
    projectId: number,
  ): Observable<AssignmentList> {
    const assignments = this.httpClient.get<AssignmentList>(
      `${ENVIRONMENT.BASE_URL}/${ASSIGNMENT.FIND_WITH_PAGINATION}`,
      { params: { pageNumber, pageSize, employeeId, projectId } }
    );

    return assignments;
  }
}
